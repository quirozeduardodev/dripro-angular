import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {Contact} from "../models/contact";

export interface IContactRepository extends IBaseRepository<Contact>{

}

export class ContactRepository extends BaseRepository<Contact> implements IContactRepository {

  constructor(database: DataBase) {
    super(database, 'contacts');
  }
}
