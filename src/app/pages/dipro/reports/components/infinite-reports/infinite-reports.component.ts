import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges,
  OnDestroy, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FiltersReports} from "../filters-sheet/filters-sheet.component";
import {BasicReportResponse} from "../../../../../types/response/report.response";
import {ReportEndpointService} from "../../../../../services/endpoints/report-endpoint.service";
import {catchError, mergeMap} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
import {PaginateResponse} from "../../../../../types/response/paginate.response";
import {IInfiniteScrollEvent} from "ngx-infinite-scroll";

@Component({
  selector: 'app-infinite-reports',
  templateUrl: './infinite-reports.component.html',
  styleUrls: ['./infinite-reports.component.scss'],
})
export class InfiniteReportsComponent implements AfterViewInit, OnDestroy, OnChanges {

  @Input() filters: FiltersReports | null = null;

  @Output() onOpenReport: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('mainWrapper') mainWrapper: ElementRef | null = null;

  data: BasicReportResponse[] = [];
  dataTotal: number = 0;
  dataPages: number = 0;
  dataCurrentPage: number = 0;

  private _mainWrapperSize: {width: number, height: number} = {width: 1, height: 1};

  mainWrapperObserver: ResizeObserver | null = null;

  readonly cardGridMinWidth: number = 120;

  cardGridHeightRatio: number = 3 / 2;
  cardGridMargin: number = 5;

  _gridPerRow: number = 0;


  status: InfiniteReportStatus = 'idle';
  initialized = false;
  constructor(private reportEndpointService: ReportEndpointService) { }

  ngAfterViewInit(): void {
    this.mainWrapperObserver = new ResizeObserver((entries, observer) => {
      const width = entries[0].contentRect.width;
      const height = entries[0].contentRect.height;
      this._mainWrapperSize = {width, height};
      this.refreshCardGridSize();
    });

    this.mainWrapperObserver?.observe(this.mainWrapper?.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      this.loadInitialData();
    }
  }

  private loadInitialData(): void {
    if (this.status === 'loadingMore' || this.status === 'initialLoading') {
      return;
    }
    this.data = [];
    this.dataTotal = 0;
    this.dataPages = 0;
    this.dataCurrentPage = 0;
    this.status = 'initialLoading';
    this.loadDataUntil(10, this.dataCurrentPage + 1)
      .pipe(catchError((err, caught) => {
        this.status = 'serverError';
        return throwError(err);
      })).subscribe(value => {
      this.data = value.data;
      this.dataTotal = value.total;
      this.dataPages = value.pages;
      this.dataCurrentPage = value.page;
      this.status = 'idle';
    });
  }

  private loadDataUntil(records: number, page: number, current: PaginateResponse<BasicReportResponse> | null = null): Observable<PaginateResponse<BasicReportResponse>> {
    const totalValue = current || {data: [], pages: 0, page: 1, total: 0, perPage: 1};
    if (this.filters) {
      return this.reportEndpointService
        .pagination({type: this.filters.type, shortByDateTime: this.filters.shortBy}, page)
        .pipe(mergeMap(value => {
          totalValue.data.push(...value.data);
          totalValue.page = value.page;
          totalValue.pages = value.pages;
          totalValue.total = value.total;
          totalValue.perPage = value.perPage;
          if (totalValue.data.length >= records || totalValue.total <= records) {
            return of(totalValue);
          }
          return this.loadDataUntil(records, page + 1, totalValue);
        }));
    }
    return throwError('Not filters set');
  }

  public loadData(page: number = 0): void {
    if (this.filters && page <= this.dataPages && (this.status !== 'loadingMore' && this.status !== 'initialLoading')) {
      this.status = 'loadingMore';
      this.reportEndpointService.pagination({type: this.filters.type, shortByDateTime: this.filters.shortBy}, page)
        .pipe(catchError((err, caught) => {
          this.status = 'serverError';
          return throwError(err);
        })).subscribe(pagination => {
        this.data.push(...pagination.data);
        this.dataTotal = pagination.total;
        this.dataPages = pagination.pages;
        this.dataCurrentPage = pagination.page;
        this.status = 'idle';
      });
    }
  }

  private refreshCardGridSize() {
    const cardsPerRow = Math.floor(this._mainWrapperSize.width / (this.cardGridMinWidth + this.cardGridMargin));
    if (this._gridPerRow != cardsPerRow) {
      this._gridPerRow = cardsPerRow >= 1 ? cardsPerRow : 1;
    }
  }

  ngOnDestroy(): void {
    this.mainWrapperObserver?.disconnect();
  }

  wrapperScrolled(scrollEvent: IInfiniteScrollEvent): void {
    if (scrollEvent.currentScrollPosition > this._mainWrapperSize.height / 2) {
      this.loadData(this.dataCurrentPage + 1);
    }
  }

  clickReport(id: number) {
    this.onOpenReport.next(id)
  }
}

export type InfiniteReportStatus = 'initialLoading' | 'loadingMore' | 'idle' | 'serverError' | 'error';
