import {environment} from "../../environments/environment";
import Dexie from "dexie";

export class DataBase extends Dexie {

  constructor() {
    super(environment.databaseName ?? 'default_database.db');
    this.version(1).stores({
      'local_reports': '++id, hash, type, answers',
      /// Online
      'answers': '++id, userId, countryId, type, folio',
      'applications': '++id, name',
      'categories': '++id, name',
      'contacts': '++id, name, phone, locationId',
      'countries': '++id, name',
      'customers': '++id, name',
      'delays': '++id, name',
      'generators': '++id, name',
      'locations': '++id, name, customerId',
      'motors': '++id, name',
      'qtas': '++id, name',
      'technicians': '++id, name, role',
      'types': '++id, name',
      'units': '++id, name',
      'users': '++id, name, role, wwid, phone',
      'synchronizations': '++id, table, synchronizedAt'
    });
  }

}

