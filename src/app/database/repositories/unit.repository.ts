import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {Unit} from "../models/unit";
import {from, Observable} from "rxjs";

export interface IUnitRepository extends IBaseRepository<Unit>{
  filterByName(name: string): Observable<Unit[]>;
}

export class UnitRepository extends BaseRepository<Unit> implements IUnitRepository {
  constructor(database: DataBase) {
    super(database, 'units');
  }

  filterByName(name: string): Observable<Unit[]> {
    return from(this.table.filter(item => item.name.toLowerCase().includes(name.trim().toLowerCase())).toArray());
  }
}
