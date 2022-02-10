import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {Country} from "../models/country";

export interface ICountryRepository extends IBaseRepository<Country>{

}

export class CountryRepository extends BaseRepository<Country> implements ICountryRepository {

  constructor(database: DataBase) {
    super(database, 'countries');
  }
}
