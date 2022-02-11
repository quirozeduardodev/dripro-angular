import { Injectable } from '@angular/core';
import { DataBase } from './database';
import {
  ILocalReportRepository,
  LocalReportRepository,
} from './repositories/local-report.repository';
import {
  AnswerRepository,
  IAnswerRepository,
} from './repositories/answer.repository';
import {
  CategoryRepository,
  ICategoryRepository,
} from './repositories/category.repository';
import {
  ContactRepository,
  IContactRepository,
} from './repositories/contact.repository';
import {
  CustomerRepository,
  ICustomerRepository,
} from './repositories/customer.repository';
import {
  CountryRepository,
  ICountryRepository,
} from './repositories/country.repository';
import {
  DelayRepository,
  IDelayRepository,
} from './repositories/delay.repository';
import {
  GeneratorRepository,
  IGeneratorRepository,
} from './repositories/generator.repository';
import {
  ILocationRepository,
  LocationRepository,
} from './repositories/location.repository';
import {
  IMotorRepository,
  MotorRepository,
} from './repositories/motor.repository';
import { IQTARepository, QTARepository } from './repositories/qta.repository';
import {
  ITechnicianRepository,
  TechnicianRepository,
} from './repositories/technician.repository';
import {
  ITypeRepository,
  TypeRepository,
} from './repositories/type.repository';
import {
  IUnitRepository,
  UnitRepository,
} from './repositories/unit.repository';
import {
  IUserRepository,
  UserRepository,
} from './repositories/user.repository';
import {
  ISynchronizationRepository,
  SynchronizationRepository,
} from './repositories/synchronization.repository';
import { ApplicationRepository, IApplicationRepository } from './repositories/application.repository';

export interface IUnitOfWorkDatabase {
  readonly answerRepository: IAnswerRepository;
  readonly applicationRepository: IApplicationRepository;
  readonly categoryRepository: ICategoryRepository;
  readonly contactRepository: IContactRepository;
  readonly customerRepository: ICustomerRepository;
  readonly countryRepository: ICountryRepository;
  readonly delayRepository: IDelayRepository;
  readonly generatorRepository: IGeneratorRepository;
  readonly localReportRepository: ILocalReportRepository;
  readonly locationRepository: ILocationRepository;
  readonly motorRepository: IMotorRepository;
  readonly QTARepository: IQTARepository;
  readonly technicianRepository: ITechnicianRepository;
  readonly typeRepository: ITypeRepository;
  readonly unitRepository: IUnitRepository;
  readonly userRepository: IUserRepository;
  readonly synchronizationRepository: ISynchronizationRepository;
}

@Injectable()
export class UnitOfWorkDatabase implements IUnitOfWorkDatabase {
  private readonly _database: DataBase;

  private _answerRepository: IAnswerRepository | null = null;
  private _applicationRepository: IApplicationRepository | null = null;
  private _categoryRepository: ICategoryRepository | null = null;
  private _contactRepository: IContactRepository | null = null;
  private _customerRepository: ICustomerRepository | null = null;
  private _countryRepository: ICountryRepository | null = null;
  private _delayRepository: IDelayRepository | null = null;
  private _generatorRepository: IGeneratorRepository | null = null;
  private _localReportRepository: ILocalReportRepository | null = null;
  private _locationRepository: ILocationRepository | null = null;
  private _motorRepository: IMotorRepository | null = null;
  private _QTARepository: IQTARepository | null = null;
  private _technicianRepository: ITechnicianRepository | null = null;
  private _typeRepository: ITypeRepository | null = null;
  private _unitRepository: IUnitRepository | null = null;
  private _userRepository: IUserRepository | null = null;
  private _synchronizationRepository: ISynchronizationRepository | null = null;
  constructor() {
    this._database = new DataBase();
  }

  public get answerRepository(): IAnswerRepository {
    return (
      this._answerRepository ??
      (this._answerRepository = new AnswerRepository(this._database))
    );
  }


  public get applicationRepository(): IApplicationRepository {
    return (
      this._applicationRepository ??
      (this._applicationRepository = new ApplicationRepository(this._database))
    );
  }

  public get categoryRepository(): ICategoryRepository {
    return (
      this._categoryRepository ??
      (this._categoryRepository = new CategoryRepository(this._database))
    );
  }

  public get contactRepository(): IContactRepository {
    return (
      this._contactRepository ??
      (this._contactRepository = new ContactRepository(this._database))
    );
  }

  public get customerRepository(): ICustomerRepository {
    return (
      this._customerRepository ??
      (this._customerRepository = new CustomerRepository(this._database))
    );
  }

  public get countryRepository(): ICountryRepository {
    return (
      this._countryRepository ??
      (this._countryRepository = new CountryRepository(this._database))
    );
  }

  public get delayRepository(): IDelayRepository {
    return (
      this._delayRepository ??
      (this._delayRepository = new DelayRepository(this._database))
    );
  }

  public get generatorRepository(): IGeneratorRepository {
    return (
      this._generatorRepository ??
      (this._generatorRepository = new GeneratorRepository(this._database))
    );
  }

  public get localReportRepository(): ILocalReportRepository {
    return (
      this._localReportRepository ??
      (this._localReportRepository = new LocalReportRepository(this._database))
    );
  }

  public get locationRepository(): ILocationRepository {
    return (
      this._locationRepository ??
      (this._locationRepository = new LocationRepository(this._database))
    );
  }

  public get motorRepository(): IMotorRepository {
    return (
      this._motorRepository ??
      (this._motorRepository = new MotorRepository(this._database))
    );
  }

  public get QTARepository(): IQTARepository {
    return (
      this._QTARepository ??
      (this._QTARepository = new QTARepository(this._database))
    );
  }

  public get technicianRepository(): ITechnicianRepository {
    return (
      this._technicianRepository ??
      (this._technicianRepository = new TechnicianRepository(this._database))
    );
  }

  public get typeRepository(): ITypeRepository {
    return (
      this._typeRepository ??
      (this._typeRepository = new TypeRepository(this._database))
    );
  }

  public get unitRepository(): IUnitRepository {
    return (
      this._unitRepository ??
      (this._unitRepository = new UnitRepository(this._database))
    );
  }

  public get userRepository(): IUserRepository {
    return (
      this._userRepository ??
      (this._userRepository = new UserRepository(this._database))
    );
  }

  public get synchronizationRepository(): ISynchronizationRepository {
    return (
      this._synchronizationRepository ??
      (this._synchronizationRepository = new SynchronizationRepository(
        this._database
      ))
    );
  }
}
