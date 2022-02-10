import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {Type} from "../models/type";

export interface ITypeRepository extends IBaseRepository<Type>{

}

export class TypeRepository extends BaseRepository<Type> implements ITypeRepository {

  constructor(database: DataBase) {
    super(database, 'types');
  }
}
