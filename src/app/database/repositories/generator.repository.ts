import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {Generator} from "../models/generator";

export interface IGeneratorRepository extends IBaseRepository<Generator>{

}

export class GeneratorRepository extends BaseRepository<Generator> implements IGeneratorRepository {

  constructor(database: DataBase) {
    super(database, 'generators');
  }
}
