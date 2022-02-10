import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {User} from "../models/user";

export interface IUserRepository extends IBaseRepository<User>{

}

export class UserRepository extends BaseRepository<User> implements IUserRepository {

  constructor(database: DataBase) {
    super(database, 'users');
  }
}
