import {DateTime} from 'luxon';

export interface CustomerResponse {
  id: number;
  countryId: number;
  name: string;
  address: string;
  phone: string;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
}
