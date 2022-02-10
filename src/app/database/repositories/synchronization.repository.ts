import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {Synchronization} from "../models/synchronization";
import {from, Observable, of} from "rxjs";
import * as moment from 'moment-timezone';
import {catchError, map, mergeMap} from "rxjs/operators";

export interface ISynchronizationRepository extends IBaseRepository<Synchronization>{
  synchronizedAtByTable(table: string): Observable<moment.Moment | null>;
  updateSynchronizedAtByTable(table: string, timestamp: moment.Moment): Observable<moment.Moment | null>;
}

export class SynchronizationRepository extends BaseRepository<Synchronization> implements ISynchronizationRepository {

  constructor(database: DataBase) {
    super(database, 'synchronizations');
  }

  public synchronizedAtByTable(table: string): Observable<moment.Moment | null> {
    return from(this.table.filter(obj => obj.table === table).first())
      .pipe(map(result => {
        if (result && result.synchronizedAt) {
          const updatedAtString = result.synchronizedAt;
          return moment(updatedAtString);
        }
        return null;
      }, catchError(err => of(null))));
  }

  public updateSynchronizedAtByTable(table: string, timestamp: moment.Moment): Observable<moment.Moment | null> {
    return from(this.table.filter(obj => obj.table === table).first())
      .pipe(mergeMap(result => {
        const syncAtString: string = timestamp.toISOString();
        if (result) {
          result.synchronizedAt = syncAtString
          return this.update(result).pipe(map(value => value.synchronizedAt ? moment(value.synchronizedAt) : null));
        } else {
          return this.add({id: 0, synchronizedAt: syncAtString, table: table}).pipe(map(value => value.synchronizedAt ? moment(value.synchronizedAt) : null));
        }
      }), catchError(err => of(null)));
  }
}
