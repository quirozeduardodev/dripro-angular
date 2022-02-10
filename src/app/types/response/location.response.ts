import * as moment from "moment-timezone";

export interface LocationResponse {
  id: number;
  customerId: number;
  countryId: number;
  name: string;
  address: string;
  city: string;
  createdAt: moment.Moment | null;
  updatedAt: moment.Moment | null;
}
