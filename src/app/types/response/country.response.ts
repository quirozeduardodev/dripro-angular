import * as moment from "moment-timezone";

export interface CountryResponse {
  id: number;
  name: string;
  countryCode: string;
  createdAt: moment.Moment | null;
  updatedAt: moment.Moment | null;
}
