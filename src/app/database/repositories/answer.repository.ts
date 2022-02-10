import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {Answer} from "../models/answer";

export interface IAnswerRepository extends IBaseRepository<Answer>{

}

export class AnswerRepository extends BaseRepository<Answer> implements IAnswerRepository {

  constructor(database: DataBase) {
    super(database, 'answers');
  }
}
