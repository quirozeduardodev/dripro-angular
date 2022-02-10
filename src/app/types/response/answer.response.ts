import * as moment from "moment-timezone";

export interface BasicAnswerResponse {
  id: number;
  formId: number;
  userId: number;
  countryId: number;
  reportType: string;
  folio: string;
  createdAt: moment.Moment | null;
  updatedAt: moment.Moment | null;
}
