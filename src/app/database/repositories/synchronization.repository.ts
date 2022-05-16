import { BaseRepository, IBaseRepository } from './base.repository';
import { DataBase } from '../database';
import { Synchronization } from '../models/synchronization';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {DateTime} from 'luxon';

export interface ISynchronizationRepository
  extends IBaseRepository<Synchronization> {
  synchronizedAtByTable(table: string): Observable<DateTime | null>;
  updateSynchronizedAtByTable(
    table: string,
    timestamp: DateTime
  ): Observable<DateTime | null>;
}

export class SynchronizationRepository
  extends BaseRepository<Synchronization>
  implements ISynchronizationRepository
{
  constructor(database: DataBase) {
    super(database, 'synchronizations');
  }

  public synchronizedAtByTable(
    table: string
  ): Observable<DateTime | null> {
    return from(this.table.filter((obj) => obj.table === table).first()).pipe(
      map(
        (result) => {
          if (result && result.synchronizedAt) {
            const updatedAtString = result.synchronizedAt;
            return DateTime.fromISO(updatedAtString);
          }
          return null;
        },
        catchError((err) => of(null))
      )
    );
  }

  public updateSynchronizedAtByTable(
    table: string,
    timestamp: DateTime
  ): Observable<DateTime | null> {
    return from(this.table.filter((obj) => obj.table === table).first()).pipe(
      mergeMap((result) => {
        const syncAtString: string = timestamp.toISO();
        if (result) {
          result.synchronizedAt = syncAtString;
          return this.update(result).pipe(
            map((value) =>
              value.synchronizedAt ? DateTime.fromISO(value.synchronizedAt) : null
            )
          );
        } else {
          return this.add({
            id: 0,
            synchronizedAt: syncAtString,
            table,
          }).pipe(
            map((value) =>
              value.synchronizedAt ? DateTime.fromISO(value.synchronizedAt) : null
            )
          );
        }
      }),
      catchError((err) => of(null))
    );
  }
}
