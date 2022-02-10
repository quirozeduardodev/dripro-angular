import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {Delay} from "../models/delay";

export interface IDelayRepository extends IBaseRepository<Delay>{

}

export class DelayRepository extends BaseRepository<Delay> implements IDelayRepository {

  constructor(database: DataBase) {
    super(database, 'delays');
  }
}
