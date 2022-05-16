import {DateTime} from 'luxon';

export interface ManualResponse {
  id: number;
  name: string;
  url: string;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
}
