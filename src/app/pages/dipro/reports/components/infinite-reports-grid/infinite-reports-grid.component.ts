import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {DateTime} from 'luxon';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ReportsService } from '../../services/reports.service';

export interface InfiniteReportGridItem {
  id: any;
  isOnline: boolean;
  name: string;
  timestamp: DateTime;
}

@Component({
  selector: 'app-infinite-reports-grid',
  templateUrl: './infinite-reports-grid.component.html',
  styleUrls: ['./infinite-reports-grid.component.scss'],
})
export class InfiniteReportsGridComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() showButtonLoadData: boolean = false;

  @Output() openItem: EventEmitter<InfiniteReportGridItem> = new EventEmitter<InfiniteReportGridItem>();
  @Output() deleteItem: EventEmitter<InfiniteReportGridItem> = new EventEmitter<InfiniteReportGridItem>();

  @ViewChild('mainWrapper') mainWrapper: ElementRef | null = null;

  itemsPerRow: number = 1;
  itemAspectRatio: number = 3 / 2;
  reports: InfiniteReportGridItem[] = [];
  test: ReplaySubject<InfiniteReportGridItem[]> = new ReplaySubject<InfiniteReportGridItem[]>(1);

  private _mainWrapperObserver: ResizeObserver | null = null;
  private _cardContainerMinWidth: number = 125;
  private _cardContainerMaxWidth: number = 175;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private translareService: TranslateService,
    public reportsService: ReportsService
    ) { }
  ngOnInit(): void {
    this.reportsService.reports
      .pipe(
        startWith([]),
        map(data => data.map(item => ({id: item.id, name: item.name, isOnline: item.isOnline, timestamp: item.createdAt}))))
        .subscribe(reports => {
          this.reports = reports;
        });
  }
  openReport(item: InfiniteReportGridItem, event: MouseEvent): void {
    event.stopPropagation();
    this.openItem.next(item);
  }

  deleteReport(item: InfiniteReportGridItem, event: MouseEvent): void {
    event.stopPropagation();
    this.deleteItem.next(item);
  }

  wrapperScrolled(event: IInfiniteScrollEvent): void {
    this.reportsService.fetchOnlineData();
  }

  ngAfterViewInit(): void {
    if (this.mainWrapper) {
      this._mainWrapperObserver = new ResizeObserver((entries, observer) => {
        if (entries.length > 0) {
          const width = entries[0].contentRect.width;
          const height = entries[0].contentRect.height;
          this.resizeCardContainerWidthFromParent(width, height);
        }
      });
      this._mainWrapperObserver.observe(this.mainWrapper.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this._mainWrapperObserver?.disconnect();
  }

  getListOfNames(item: InfiniteReportGridItem): Observable<string[]> {
    if (item.isOnline) {
      return of([item.name]);
    }
    const reportTypeSplit: string[] = item.name.split('-') || [];
    for (let i = 1; i < reportTypeSplit.length; i++) {
      reportTypeSplit[i] = `${reportTypeSplit[i - 1]}-${reportTypeSplit[i]}`;
    }
    return combineLatest(reportTypeSplit.map(val => this.translareService.get(`reports.common.names.${val}`)))
    .pipe(map(values => values as string[]));
  }

  private resizeCardContainerWidthFromParent(width: number, height: number): void {
    const med = (this._cardContainerMinWidth + this._cardContainerMaxWidth) / 2;
    const wMinCapacity = width / this._cardContainerMinWidth;
    const wMedCapacity = width / med;
    const wMaxCapacity = width / this._cardContainerMaxWidth;

    let fCapacity = 1;
    if (wMaxCapacity < 3) {
      if(wMedCapacity < 3 ) {
        fCapacity = wMinCapacity < 2 ? 1: wMinCapacity;
      } else  {
        fCapacity = wMedCapacity;
      }
    } else {
      fCapacity = wMaxCapacity;
    }
    fCapacity = Math.floor(fCapacity);
    if (this.itemsPerRow !== fCapacity) {
      this.itemsPerRow = fCapacity;
      this.changeDetectorRef.detectChanges();
    }
  }
}
