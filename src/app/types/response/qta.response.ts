import {DateTime} from 'luxon';

export interface QTAResponse {
  id: number;
  name: string;
  status: boolean;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
}
