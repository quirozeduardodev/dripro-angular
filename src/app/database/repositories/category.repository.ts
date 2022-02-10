import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {Category} from "../models/category";

export interface ICategoryRepository extends IBaseRepository<Category>{

}

export class CategoryRepository extends BaseRepository<Category> implements ICategoryRepository {

  constructor(database: DataBase) {
    super(database, 'categories');
  }
}
