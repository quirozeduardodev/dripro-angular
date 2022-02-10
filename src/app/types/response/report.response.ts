import {Moment} from "moment-timezone";

export interface BasicReportResponse {
  id: number;
  form: string;
  folio: string;
  createdAt: Moment | null;
}


export interface ReportResponse {

}
