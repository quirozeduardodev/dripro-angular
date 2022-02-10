import {ShortType} from "../short.type";

export interface ReportFiltersRequest {
  type: 'JSA' | 'SERVICE' | 'INGERSOLL';
  shortByDateTime: ShortType;
}
