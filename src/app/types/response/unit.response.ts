import {DateTime} from 'luxon';

export interface UnitResponse {
  id: number;
  name: string;
  status: boolean;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
}
