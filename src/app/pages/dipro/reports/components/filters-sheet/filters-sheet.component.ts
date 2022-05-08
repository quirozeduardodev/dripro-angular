import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {SheetComponent} from '../../../../../components/sheet/sheet.component';
import {UserResponse} from '../../../../../types/response/user.response';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../../services/auth.service';

@Component({
  selector: 'app-filters-sheet',
  templateUrl: './filters-sheet.component.html',
  styleUrls: ['./filters-sheet.component.scss'],
})
export class FiltersSheetComponent implements OnInit, OnDestroy {

  @ViewChild('filterSheet') filterSheet: SheetComponent | null = null;
  @Output() filtersChanged: EventEmitter<FiltersReports> = new EventEmitter<FiltersReports>();

  filters: FiltersReports | null = null;
  user: UserResponse | null = null;

  private _userSubscription: Subscription | null = null;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._userSubscription = this._authService.user.subscribe(user => {
      this.user = user;
    });
  }

  open(filters: FiltersReports) {
    this.filters = filters;
    this.filterSheet?.open();
  }

  applyClose(): void {
    if (this.filters) {
      this.filtersChanged.emit(this.filters);
    }
    this.filterSheet?.close();
  }

  updateFilters(filters: {type?: 'SERVICE' | 'JSA' | 'INGERSOLL', shortBy?: 'asc' | 'desc', offline?: boolean}): void {
    if (!this.filters) {
      this.filters = {
        type: filters.type ?? 'JSA',
        shortBy: filters.shortBy ?? 'desc',
        offline: filters.offline ?? true
      };
    }
    if (this.filters && filters.type) {
      this.filters.type = filters.type;
    }
    if (this.filters && filters.shortBy) {
      this.filters.shortBy = filters.shortBy;
    }
    if (this.filters && filters.offline !== undefined) {
      this.filters.offline = filters.offline;
    }
  }

  sheetVisible(isVisible: boolean): void {
    if (!isVisible) {
      this.applyClose();
    }
  }

  ngOnDestroy(): void {
    this._userSubscription?.unsubscribe();
  }
}

export interface FiltersReports {
  type: 'JSA' | 'SERVICE' | 'INGERSOLL';
  shortBy: 'asc' | 'desc';
  offline: boolean;
}
