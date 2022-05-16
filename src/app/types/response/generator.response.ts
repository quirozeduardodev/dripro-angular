import {DateTime} from 'luxon';

export interface GeneratorResponse {
  id: number;
  name: string;
  status: boolean;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
}
