import {DateTime} from 'luxon';

export interface ApplicationResponse {
  id: number;
  name: string;
  status: boolean;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
}
