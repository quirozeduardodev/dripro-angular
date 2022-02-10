import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {Customer} from "../models/customer";

export interface ICustomerRepository extends IBaseRepository<Customer>{

}

export class CustomerRepository extends BaseRepository<Customer> implements ICustomerRepository {

  constructor(database: DataBase) {
    super(database, 'customers');
  }
}
