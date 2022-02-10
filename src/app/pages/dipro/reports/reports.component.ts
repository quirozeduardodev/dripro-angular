import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportEndpointService } from '../../../services/endpoints/report-endpoint.service';
import { PaginateResponse } from '../../../types/response/paginate.response';
import { BasicReportResponse } from '../../../types/response/report.response';
import { FiltersReports } from './components/filters-sheet/filters-sheet.component';
import { Router } from '@angular/router';
import { LocalReport } from '../../../database/models/local_report';
import { UnitOfWorkDatabase } from '../../../database/unit-of-work.database';
import { InfiniteReportGridItem } from './components/infinite-reports-grid/infinite-reports-grid.component';
import * as moment from 'moment-timezone';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BaseDialogComponent } from 'src/app/components/dialogs/base-dialog/base-dialog.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {

  @ViewChild('dialogDelete') dialogDelete: BaseDialogComponent | null = null;

  pagination: PaginateResponse<BasicReportResponse> | null = null;
  isLoading: boolean = true;
  filters: FiltersReports | null = null;
  reportsMerged: InfiniteReportGridItem[] = [];
  isLoadingNewData: boolean = false;


  private _onlineReports: BasicReportResponse[] = [];
  private _offlineReports: LocalReport[] = [];
  private _latstPaginationReportsLoaded: PaginateResponse<BasicReportResponse> | null = null;
  private _localIdSelectedToDelete: number | null = null;
  constructor(
    private unitOfWorkDatabase: UnitOfWorkDatabase,
    private reportEndpointService: ReportEndpointService,
    private router: Router
  ) {}

  get hasMoreOnlineData(): boolean {
    return !this._latstPaginationReportsLoaded ? false :
      (this._latstPaginationReportsLoaded.pages < this._latstPaginationReportsLoaded.page + 1 ? false : true);
  }

  ngOnInit() {
    this.loadOfflineReports();
  }

  refreshMergedReports(): void {
    const final: InfiniteReportGridItem[] = [];
    final.push(
      ...this._offlineReports.map((value) => ({
          id: value.id,
          name: value.type,
          isOnline: false,
          timestamp: value.createdAt ? moment(value.createdAt) : moment(),
        }))
    );
    final.push(
      ...this._onlineReports.map((value) => ({
          id: value.id,
          name: value.folio,
          isOnline: true,
          timestamp: value.createdAt ? moment(value.createdAt) : moment(),
        }))
    );

    this.reportsMerged = final;
  }

  loadOfflineReports(): void {
    this.unitOfWorkDatabase.localReportRepository.all().subscribe((reports) => {
      this._offlineReports = reports;
      this.refreshMergedReports();
    });
  }

  cleanOnlineReports(): void {
    this._onlineReports = [];
    this._latstPaginationReportsLoaded = null;
    this.refreshMergedReports();
    this.loadData();
  }

  loadData(): void {
    if(this.isLoadingNewData) {
      return;
    }
    this.isLoadingNewData = true;

    const page = !this._latstPaginationReportsLoaded ? 1 :
      !this.hasMoreOnlineData ? -1 :
      (this._latstPaginationReportsLoaded.page + 1);
    if(page < 0) {
      return;
    }

    if (this.filters) {
      this.reportEndpointService.pagination({
        type: this.filters.type,
        shortByDateTime: this.filters.shortBy
      }, page)
      .pipe(catchError(error => {
        this.isLoadingNewData = false;
        return of(error);
      }))
      .subscribe(reports => {
        this._latstPaginationReportsLoaded = reports;
        this.isLoadingNewData = false;
        this._onlineReports = [...this._onlineReports, ...reports.data];
        this.refreshMergedReports();
      });
    }
  }


  initialFilters(type: 'SERVICE' | 'JSA' | 'INGERSOLL'): void {
    this.filters = {
      type,
      shortBy: 'desc',
      offline: true,
    };
    this.cleanOnlineReports();
  }

  cloneFilters(filters: FiltersReports): FiltersReports {
    return Object.assign({}, filters);
  }
  filtersChanged(filters: FiltersReports): void {
    if (!this.filters) {
      this.filters = filters;
      this.cleanOnlineReports();
    } else {
      if (
        this.filters.type !== filters.type ||
        this.filters.offline !== filters.offline ||
        this.filters.shortBy !== filters.shortBy
      ) {
        this.filters = filters;
        this.cleanOnlineReports();
      }
    }
  }

  openOnlineReport(id: number): void {
    this.router.navigate([`/reports/view/${id}`]);
  }

  openLocalReport(id: number): void {
    this.router.navigate([`/reports/edit/${id}`]);
  }

  deleteItem(id: number): void {
    this._localIdSelectedToDelete = id;
    this.dialogDelete?.open();
  }

  confirmDeleteReport(): void {
    this.dialogDelete?.close();
    if(this._localIdSelectedToDelete) {
      this.unitOfWorkDatabase.localReportRepository.delete(this._localIdSelectedToDelete)
      .subscribe(result => {
        this.loadOfflineReports();
      });
    }
  }
}
