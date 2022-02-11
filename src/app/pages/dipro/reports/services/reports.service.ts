import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import { BehaviorSubject, combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LocalReport } from 'src/app/database/models/local_report';
import { UnitOfWorkDatabase } from 'src/app/database/unit-of-work.database';
import { ReportEndpointService } from 'src/app/services/endpoints/report-endpoint.service';
import { PaginateResponse } from 'src/app/types/response/paginate.response';
import { BasicReportResponse } from 'src/app/types/response/report.response';
import { FiltersReports } from '../components/filters-sheet/filters-sheet.component';

export interface MergedReport {
  id: any;
  name: string;
  isOnline: boolean;
  createdAt: moment.Moment;
}

export declare type ServiceState = 'idle' | 'loading';

@Injectable()
export class ReportsService {

  private _localReportsLoader: LocalReportsLoader;
  private _onlineReportsLoader: OnlineReportsLoader;
  private _filters: FiltersReports | null = null;
  constructor(
    private _reportEndpointService: ReportEndpointService,
    private _unitOfWorkDatabase: UnitOfWorkDatabase
    ) {
      this._localReportsLoader = new LocalReportsLoader(_unitOfWorkDatabase);
      this._onlineReportsLoader = new OnlineReportsLoader(_reportEndpointService);
  }

  get state(): Observable<ServiceState> {
    return combineLatest([this._localReportsLoader.state, this._onlineReportsLoader.state])
    .pipe(map(result => result.includes('loading') ? 'loading' : 'idle'));
  }

  get reports(): Observable<MergedReport[]> {
    return combineLatest([this._localReportsLoader.data, this._onlineReportsLoader.data])
    .pipe(mergeMap(result => this._mergeReportsShort(result[0], result[1])));
  }

  public refreshLocalData(): void {
    this._localReportsLoader.refreshData();
  }

  public fetchOnlineData(): void {
    this._onlineReportsLoader.fetchData();
  }

  public updateFilters(filters: FiltersReports): void {
    this._filters = filters;
    this._onlineReportsLoader.setFilters(this._filters);
    this._localReportsLoader.setFilters(this._filters);
  }


  private async _mergeReportsShort(_localReports: LocalReport[], _onlineReports: BasicReportResponse[]): Promise<MergedReport[]> {
    const localReports: MergedReport[] = await _localReports.map(item => ({
      id: item.id,
      name: item.type as string,
      createdAt: item.createdAt ? moment(item.createdAt) : moment(),
      isOnline: false
    }));
    const onlineReports = await _onlineReports.map(item => ({
        id: item.id,
        name: item.folio,
        createdAt: item.createdAt ? moment(item.createdAt) : moment(),
        isOnline: true
      }));
    const shortBy = this._filters?.shortBy === 'asc' ? 'asc' : 'desc';
    const result: MergedReport[] = await [...localReports, ...onlineReports].sort((a, b) => {
      if (a.createdAt.isBefore(b.createdAt)) {
        return shortBy === 'desc' ? 1 : -1;
      } else if(a.createdAt.isAfter(b.createdAt)) {
        return shortBy === 'desc' ? -1 : 1;
      } else {
        return 0;
      }
    });
    return result;;
  }
}

abstract class BaseHandlerLoader<TData> {
  private _state: ServiceState = 'idle';

  private _data: TData | null = null;

  private _state$: BehaviorSubject<ServiceState> = new BehaviorSubject<ServiceState>('idle');
  private _data$: ReplaySubject<TData> = new ReplaySubject<TData>(1);

  public get state(): Observable<ServiceState> {
    return this._state$.asObservable();
  }

  public get data(): Observable<TData> {
    return this._data$.asObservable();
  }

  public getState(): ServiceState {
    return this._state;
  };

  public setState(state: ServiceState): void {
    this._state = state;
    this._state$.next(this._state);
  }

  public getData(): TData | null {
    return this._data;
  }

  public setData(data: TData): void {
    this._data = data;
    if(this._data) {
      this._data$.next(this._data);
    }
  }
}

class LocalReportsLoader extends BaseHandlerLoader<LocalReport[]> {
  private _filters: FiltersReports | null = null;
  constructor(private _unitOfWorkDatabase: UnitOfWorkDatabase) {
    super();
  }

  public setFilters(filters: FiltersReports): void {
    this._filters = filters;
    this.refreshData();
  }

  public refreshData(): void {
    if(this.getState() === 'loading' || !this._filters) {
      return;
    }
    if(this._filters.offline) {
      this.setState('loading');
      this._unitOfWorkDatabase.localReportRepository.allByRootType(this._filters.type)
      .pipe(catchError(error => of([])))
      .subscribe(result => {
        this.setState('idle');
        this.setData(result);
      });
    } else {
      this.setData([]);
    }
  }
}

class OnlineReportsLoader extends BaseHandlerLoader<BasicReportResponse[]> {

  private _pagination: PaginateResponse<BasicReportResponse> | null =  null;
  private _filters: FiltersReports | null = null;
  constructor(private _reportEndpointService: ReportEndpointService) {
    super();
  }

  public setFilters(filters: FiltersReports): void {
    this._filters = filters;
    this.fetchData(true);
  }

  public fetchData(reset: boolean = false): void {
    if(this.getState() === 'loading') {
      return;
    }
    this.setState('loading');
    const page = reset ? 1 :
      (this._pagination ? (this._pagination.page + 1 <= this._pagination.pages ? this._pagination.page + 1 : -1) : 1);
    if(page < 0) {
      return;
    }
    if(this._filters) {
      this._reportEndpointService.pagination({
        type: this._filters.type,
        shortByDateTime: this._filters.shortBy
      }, page)
      .pipe(catchError(error => of(null)))
      .subscribe(result => {
        this.setState('idle');
        this._pagination = result;
        if(reset) {
          this.setData(this._pagination?.data || []);
        } else {
          const prevData: BasicReportResponse[] = this.getData() || [];
          this.setData([...prevData, ...(this._pagination?.data || [])]);
        }
      });
    }
  }
}
