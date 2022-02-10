import * as moment from "moment-timezone";

export interface GeneratorResponse {
  id: number;
  name: string;
  status: boolean;
  createdAt: moment.Moment | null;
  updatedAt: moment.Moment | null;
}
