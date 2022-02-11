import {BaseRepository, IBaseRepository} from './base.repository';
import {DataBase} from '../database';
import { Application } from '../models/application';

export type IApplicationRepository = IBaseRepository<Application>;

export class ApplicationRepository extends BaseRepository<Application> implements IApplicationRepository {

  constructor(database: DataBase) {
    super(database, 'applications');
  }
}
