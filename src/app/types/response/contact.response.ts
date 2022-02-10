import * as moment from "moment-timezone";

export interface ContactResponse {
  id: number;
  name: string;
  phone: string;
  locationId: number;
  department: string;
  position: string;
  email: string;
  createdAt: moment.Moment | null;
  updatedAt: moment.Moment | null;
}
