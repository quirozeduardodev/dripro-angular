import * as moment from "moment-timezone";

export interface CustomerResponse {
  id: number;
  countryId: number;
  name: string;
  address: string;
  phone: string;
  createdAt: moment.Moment | null;
  updatedAt: moment.Moment | null;
}
