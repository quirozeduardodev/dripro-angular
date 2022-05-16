import {DateTime} from 'luxon';

export interface BasicAnswerResponse {
  id: number;
  formId: number;
  userId: number;
  countryId: number;
  reportType: string;
  folio: string;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
}
