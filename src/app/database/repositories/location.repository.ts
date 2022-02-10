import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {Location} from "../models/location";

export interface ILocationRepository extends IBaseRepository<Location>{

}

export class LocationRepository extends BaseRepository<Location> implements ILocationRepository {

  constructor(database: DataBase) {
    super(database, 'locations');
  }
}
