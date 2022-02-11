import { BaseRepository, IBaseRepository } from './base.repository';
import { DataBase } from '../database';
import { LocalReport } from '../models/local_report';
import { from, Observable } from 'rxjs';

export interface ILocalReportRepository extends IBaseRepository<LocalReport> {
  allByRootType(type: 'JSA' | 'SERVICE' | 'INGERSOLL'): Observable<LocalReport[]>;
}

export class LocalReportRepository
  extends BaseRepository<LocalReport>
  implements ILocalReportRepository
{
  constructor(database: DataBase) {
    super(database, 'local_reports');
  }
  allByRootType(type: 'JSA' | 'SERVICE' | 'INGERSOLL'): Observable<LocalReport[]> {
    return from(this.table.filter((obj) => (obj.type as string).split('-')[0].toUpperCase().includes(type)).toArray());
  }
}
