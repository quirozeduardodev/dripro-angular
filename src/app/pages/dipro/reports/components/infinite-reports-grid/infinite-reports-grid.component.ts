import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment-timezone';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShortType } from 'src/app/types/short.type';

export interface InfiniteReportGridItem {
  id: any;
  isOnline: boolean;
  name: string;
  timestamp: moment.Moment;
}

@Component({
  selector: 'app-infinite-reports-grid',
  templateUrl: './infinite-reports-grid.component.html',
  styleUrls: ['./infinite-reports-grid.component.scss'],
})
export class InfiniteReportsGridComponent implements AfterViewInit, OnDestroy, OnChanges {

  @Input() reports: InfiniteReportGridItem[] = [];
  @Input() shortBy: ShortType = 'desc';
  @Input() showButtonLoadData: boolean = false;

  @Output() openItem: EventEmitter<InfiniteReportGridItem> = new EventEmitter<InfiniteReportGridItem>();
  @Output() deleteItem: EventEmitter<InfiniteReportGridItem> = new EventEmitter<InfiniteReportGridItem>();
  @Output() loadData: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('mainWrapper') mainWrapper: ElementRef | null = null;

  shortedReports: InfiniteReportGridItem[] = [];
  itemsPerRow: number = 1;
  itemAspectRatio: number = 3 / 2;

  private _mainWrapperObserver: ResizeObserver | null = null;
  private _cardContainerMinWidth: number = 125;
  private _cardContainerMaxWidth: number = 175;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private translareService: TranslateService
    ) { }

  openReport(item: InfiniteReportGridItem, event: MouseEvent): void {
    event.stopPropagation();
    this.openItem.next(item);
  }

  deleteReport(item: InfiniteReportGridItem, event: MouseEvent): void {
    event.stopPropagation();
    this.deleteItem.next(item);
  }

  wrapperScrolled(event: IInfiniteScrollEvent): void {
    this.loadData.next();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reports || changes.shortBy) {
      this.shortReports();
    }
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

  private shortReports(): void {
    const shortBy = this.shortBy === 'desc' ? 'desc' : 'asc';
    console.log(shortBy);
    this.shortedReports = this.reports.sort((a, b) => {
      if (a.timestamp.isBefore(b.timestamp)) {
        return shortBy === 'desc' ? 1 : -1;
      } else if(a.timestamp.isBefore(b.timestamp)) {
        return shortBy === 'desc' ? -1 : 1;
      } else {
        return 0;
      }
    });
  }
}
