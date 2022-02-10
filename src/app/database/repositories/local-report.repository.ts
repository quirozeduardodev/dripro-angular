import {BaseRepository, IBaseRepository} from "./base.repository";
import {DataBase} from "../database";
import {LocalReport} from "../models/local_report";

export interface ILocalReportRepository extends IBaseRepository<LocalReport>{

}

export class LocalReportRepository extends BaseRepository<LocalReport> implements ILocalReportRepository {

  constructor(database: DataBase) {
    super(database, 'local_reports');
  }
}
