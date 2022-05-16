import {DateTime} from 'luxon';

export interface MotorResponse {
  id: number;
  name: string;
  status: boolean;
  createdAt: DateTime | null;
  updatedAt: DateTime | null;
}
