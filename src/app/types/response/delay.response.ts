import * as moment from "moment-timezone";

export interface DelayResponse {
  id: number;
  name: string;
  status: boolean;
  createdAt: moment.Moment | null;
  updatedAt: moment.Moment | null;
}
