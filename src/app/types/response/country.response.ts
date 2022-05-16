import {DateTime} from 'luxon';

export interface CountryResponse {
  id: number;
  name: string;
  countryCode: string;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
}
