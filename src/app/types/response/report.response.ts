import {DateTime} from 'luxon';

export interface BasicReportResponse {
  id: number;
  form: string;
  folio: string;
  createdAt: DateTime | null;
}


export interface ReportResponse {

}
