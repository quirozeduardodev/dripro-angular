import {DateTime} from 'luxon';

export interface LocationResponse {
  id: number;
  customerId: number;
  countryId: number;
  name: string;
  address: string;
  city: string;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
}
