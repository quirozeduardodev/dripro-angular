import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportEndpointService } from '../../../services/endpoints/report-endpoint.service';
import { PaginateResponse } from '../../../types/response/paginate.response';
import { BasicReportResponse } from '../../../types/response/report.response';
import { FiltersReports } from './components/filters-sheet/filters-sheet.component';
import { Router } from '@angular/router';
import { LocalReport } from '../../../database/models/local_report';
import { UnitOfWorkDatabase } from '../../../database/unit-of-work.database';
import { InfiniteReportGridItem } from './components/infinite-reports-grid/infinite-reports-grid.component';
import { BaseDialogComponent } from 'src/app/components/dialogs/base-dialog/base-dialog.component';
import { ReportsService } from './services/reports.service';

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

  private _latstPaginationReportsLoaded: PaginateResponse<BasicReportResponse> | null = null;
  private _localIdSelectedToDelete: number | null = null;
  constructor(
    private unitOfWorkDatabase: UnitOfWorkDatabase,
    private reportEndpointService: ReportEndpointService,
    private router: Router,
    private reportsService: ReportsService
  ) {}

  get hasMoreOnlineData(): boolean {
    return !this._latstPaginationReportsLoaded ? false :
      (this._latstPaginationReportsLoaded.pages < this._latstPaginationReportsLoaded.page + 1 ? false : true);
  }

  ngOnInit() {
  }

  cleanOnlineReports(): void {
    if(this.filters) {
      this.reportsService.updateFilters({
        type: this.filters.type,
        shortByDateTime: this.filters.shortBy
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
        this.reportsService.refreshLocalData();
      });
    }
  }
}
