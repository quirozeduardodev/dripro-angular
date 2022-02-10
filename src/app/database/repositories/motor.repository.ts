import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {Motor} from "../models/motor";

export interface IMotorRepository extends IBaseRepository<Motor>{

}

export class MotorRepository extends BaseRepository<Motor> implements IMotorRepository {

  constructor(database: DataBase) {
    super(database, 'motors');
  }
}
