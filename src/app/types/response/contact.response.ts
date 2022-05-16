import {DateTime} from 'luxon';

export interface ContactResponse {
  id: number;
  name: string;
  phone: string;
  locationId: number;
  department: string;
  position: string;
  email: string;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
}
