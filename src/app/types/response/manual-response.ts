import * as moment from 'moment-timezone';

export interface ManualResponse {
  id: number;
  name: string;
  url: string;
  createdAt: moment.Moment | null;
  updatedAt: moment.Moment | null;
}
