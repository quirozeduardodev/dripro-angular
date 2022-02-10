import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {QTA} from "../models/qta";

export interface IQTARepository extends IBaseRepository<QTA>{

}

export class QTARepository extends BaseRepository<QTA> implements IQTARepository {

  constructor(database: DataBase) {
    super(database, 'qtas');
  }
}
