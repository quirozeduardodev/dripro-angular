import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {Technician} from "../models/technician";

export interface ITechnicianRepository extends IBaseRepository<Technician>{

}

export class TechnicianRepository extends BaseRepository<Technician> implements ITechnicianRepository {

  constructor(database: DataBase) {
    super(database, 'technicians');
  }
}
