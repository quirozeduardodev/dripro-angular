import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SheetComponent} from "../../../../../components/sheet/sheet.component";

@Component({
  selector: 'app-filters-sheet',
  templateUrl: './filters-sheet.component.html',
  styleUrls: ['./filters-sheet.component.scss'],
})
export class FiltersSheetComponent implements OnInit {

  filters: FiltersReports | null = null;
  @ViewChild('filterSheet') filterSheet: SheetComponent | null = null;
  @Output() filtersChanged: EventEmitter<FiltersReports> = new EventEmitter<FiltersReports>();
  constructor() { }

  ngOnInit() {}

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
}

export interface FiltersReports {
  type: 'JSA' | 'SERVICE' | 'INGERSOLL';
  shortBy: 'asc' | 'desc';
  offline: boolean;
}
