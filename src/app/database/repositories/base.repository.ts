import {forkJoin, from, Observable, of, ReplaySubject, throwError} from "rxjs";
import {DataBase} from "../database";
import {Table} from "dexie";
import * as moment from 'moment-timezone';
import {catchError, map, mergeMap, take} from "rxjs/operators";
import {isIterable} from "rxjs/internal-compatibility";

export interface IBaseRepository<T> {
  all(): Observable<T[]>;
  find(id: number): Observable<T | null>;
  add(item: T): Observable<T>;
  bulkAdd(items: T[]): Observable<T[]>;
  bulkUpsert(items: T[]): Observable<T[]>;

  update(item: T): Observable<T>;
  bulkUpdate(items: T[]): Observable<T[]>;
  count(): Observable<number>;

  delete(key: number): Observable<boolean>;
  bulkDelete(key: number[]): Observable<boolean>;
  deleteAll(): Observable<boolean>;
}

export class BaseRepository<T> implements IBaseRepository<T>{

  protected database: DataBase;
  protected databaseName: string;
  protected table: Table<T, number>;
  constructor(database: DataBase, databaseName: string) {
    this.database = database;
    this.databaseName = databaseName;
    this.table = this.database.table<T, number>(this.databaseName);
  }

  all(): Observable<T[]> {
    return from(this.table.filter(obj => true).toArray());
  }

  find(id: number): Observable<T | null> {
    return from(this.table.get(id)).pipe(map(value1 => value1 ?? null));
  }

  add(item: T, options?: {replaceTimestamps?: boolean}): Observable<T> {

    const fOptions: AddOptions = {
      replaceTimestamps: (options === undefined || options.replaceTimestamps === true || options.replaceTimestamps === undefined) /// By default is true
    };

    /*
      The item id will be set in undefined value just in case the id is less than zero
      this for that an id be generated automatically by  the database
       */
    // @ts-ignore
    item.id = item.id <= 0 ? undefined : item.id;
    // @ts-ignore
    item.createdAt = fOptions.replaceTimestamps ? moment().toISOString() : (item.createdAt || moment().toISOString());
    // @ts-ignore
    item.updatedAt = fOptions.replaceTimestamps ? moment().toISOString() : (item.updatedAt || moment().toISOString());
    return from(this.table.add(item))
      .pipe(mergeMap(value => {
        return from(this.table.get(value)).pipe(mergeMap(value1 => {
          if (value1) {
            return of(value1);
          } else {
            return throwError('The item could not be added');
          }
        }));
      }));
  }

  bulkAdd(items: T[], options?: {replaceTimestamps?: boolean}): Observable<T[]> {

    const fOptions: AddOptions = {
      replaceTimestamps: (options === undefined || options.replaceTimestamps === true || options.replaceTimestamps === undefined) /// By default is true
    };


    const finalItems = items.map(item => {
      /*
      The item id will be set in undefined value just in case the id is less than zero
      this for that an id be generated automatically by  the database
       */
      // @ts-ignore
      item.id = item.id <= 0 ? undefined : item.id;
      // @ts-ignore
      item.createdAt = fOptions.replaceTimestamps ? moment().toISOString() : (item.createdAt || moment().toISOString());
      // @ts-ignore
      item.updatedAt = fOptions.replaceTimestamps ? moment().toISOString() : (item.updatedAt || moment().toISOString());
      return item;
    });

    return from(this.table.bulkAdd(finalItems, undefined, {allKeys: true}))
      .pipe(mergeMap(value => {
        const replaySubject: ReplaySubject<T[]> = new ReplaySubject<T[]>(1);
        if (isIterable(value)) {
          // @ts-ignore
          this.table.bulkGet((value as number[])).then(result => {
            replaySubject.next(result.filter(value1 => value1) as T[]);
            replaySubject.complete();
          }).catch(reason => {
            replaySubject.error(reason);
            replaySubject.complete();
          });
        } else  {
          replaySubject.next([]);
          replaySubject.complete();
        }
        return replaySubject;
      }));
  }

  bulkUpsert(items: T[], options?: {replaceTimestamps?: boolean}): Observable<T[]> {

    const fOptions: UpsertOptions = {
      replaceTimestamps: (options === undefined || options.replaceTimestamps === true || options.replaceTimestamps === undefined) /// By default is true
    };

    // @ts-ignore
    const itemsId: number[] = items.map(value => value.id != undefined ? value.id : -1);

    // @ts-ignore
    return from(this.table.filter(obj => itemsId.includes(obj.id)).toArray())
      .pipe(mergeMap(existing => {
        // @ts-ignore
        const existingIds: number[] = existing.map(item => item.id != undefined ? item.id : -1);

        const existingItems: T[] = [];
        const newItems: T[] = [];
        for (const item of items) {
          // @ts-ignore
          if (existingIds.includes(item.id)) {
            existingItems.push(item);
          } else {
            newItems.push(item)
          }
        }
        // @ts-ignore
        const realExistingIds: number[] = existingItems.map(value => value.id);

        return forkJoin({
          updated: this.bulkUpdate(existingItems, fOptions),
          inserted: this.bulkAdd(newItems, fOptions)
        }).pipe(map(result => [...result.inserted, ...result.updated]));
      }));
  }

  update(item: T, options?: {replaceTimestamps?: boolean}): Observable<T> {
    const fOptions: UpdateOptions = {
      replaceTimestamps: (options === undefined || options.replaceTimestamps === true || options.replaceTimestamps === undefined) /// By default is true
    };
    // @ts-ignore
    item.updatedAt = fOptions.replaceTimestamps ? moment().toISOString() : (item.updatedAt || moment().toISOString());
    return from(this.table.put(item))
      .pipe(mergeMap(value => {
        if (value <= 0) {
          return throwError('The item could not be updated');
        }
        // @ts-ignore
        return from(this.table.get(item.id)).pipe(mergeMap(value1 => {
          if (value1) {
            return of(value1);
          } else {
            return throwError('The item could not be updated');
          }
        }));
      }));
  }

  bulkUpdate(items: T[], options?: {replaceTimestamps?: boolean}): Observable<T[]> {
    const fOptions: UpdateOptions = {
      replaceTimestamps: (options === undefined || options.replaceTimestamps === true || options.replaceTimestamps === undefined) /// By default is true
    };

    const nowString = moment().toISOString();

    for (let i = 0; i < items.length; i++) {
      // @ts-ignore
      items[i].updatedAt = fOptions.replaceTimestamps ? nowString : (item.updatedAt || nowString);
    }

    return from(this.table.bulkPut(items, {allKeys: true}))
      .pipe(mergeMap(value => {
        if (!value) {
          return throwError('All items could not be updated');
        }
        return from(this.table.bulkGet(value)).pipe(map(valueX => {
          const finalArray: T[] = [];
          for (const valueX1 of valueX) {
            if(valueX1) {
              finalArray.push(valueX1);
            }
          }
          return finalArray;
        }));
      }));
  }

  count(): Observable<number> {
    return from(this.table.count());
  }

  delete(key: number): Observable<boolean> {
    return from(this.table.delete(key)).pipe(map(value => true), catchError(err => of(false)), take(1));
  }

  bulkDelete(keys: number[]): Observable<boolean> {
    return from(this.table.bulkDelete(keys)).pipe(map(value => true), catchError(err => of(false)), take(1));
  }

  deleteAll(): Observable<boolean> {
    return from(this.table.clear()).pipe(map(value => true), catchError(err => of(false)), take(1));
  }

}

export interface AddOptions {
  replaceTimestamps: boolean;
}
export interface UpdateOptions {
  replaceTimestamps: boolean;
}
export interface UpsertOptions {
  replaceTimestamps: boolean;
}
