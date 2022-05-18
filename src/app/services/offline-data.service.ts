import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { UnitOfWorkDatabase } from '../database/unit-of-work.database';
import { UserEndpointService } from './endpoints/user-endpoint.service';
import { AnswerEndpointService } from './endpoints/answer-endpoint.service';
import { ContactEndpointService } from './endpoints/contact-endpoint.service';
import { CategoryEndpointService } from './endpoints/category-endpoint.service';
import { CountryEndpointService } from './endpoints/country-endpoint.service';
import { CustomerEndpointService } from './endpoints/customer-endpoint.service';
import { DelayEndpointService } from './endpoints/delay-endpoint.service';
import { GeneratorEndpointService } from './endpoints/generator-endpoint.service';
import { LocationEndpointService } from './endpoints/location-endpoint.service';
import { MotorEndpointService } from './endpoints/motor-endpoint.service';
import { QTAEndpointService } from './endpoints/qta-endpoint.service';
import { TypeEndpointService } from './endpoints/type-endpoint.service';
import { UnitEndpointService } from './endpoints/unit-endpoint.service';
import { catchError, distinct, map, mergeMap, take } from 'rxjs/operators';
import { Answer } from '../database/models/answer';
import {
  BaseRepository,
  IBaseRepository,
} from '../database/repositories/base.repository';
import { BasicAnswerResponse } from '../types/response/answer.response';
import { CategoryResponse } from '../types/response/category.response';
import { Category } from '../database/models/category';
import { Contact } from '../database/models/contact';
import { Country } from '../database/models/country';
import { Customer } from '../database/models/customer';
import { Delay } from '../database/models/delay';
import { Location } from '../database/models/location';
import { Motor } from '../database/models/motor';
import { QTA } from '../database/models/qta';
import { Technician } from '../database/models/technician';
import { Type } from '../database/models/type';
import { Unit } from '../database/models/unit';
import { User } from '../database/models/user';
import { ContactResponse } from '../types/response/contact.response';
import { CountryResponse } from '../types/response/country.response';
import { CustomerResponse } from '../types/response/customer.response';
import { DelayResponse } from '../types/response/delay.response';
import { GeneratorResponse } from '../types/response/generator.response';
import { LocationResponse } from '../types/response/location.response';
import { MotorResponse } from '../types/response/motor.response';
import { QTAResponse } from '../types/response/qta.response';
import {
  BasicUserResponse,
  UserResponse,
} from '../types/response/user.response';
import { TypeResponse } from '../types/response/type.response';
import { UnitResponse } from '../types/response/unit.response';
import { Generator } from '../database/models/generator';
import { ApplicationResponse } from '../types/response/application.response';
import { Application } from '../database/models/application';
import { ApplicationEndpointService } from './endpoints/application-endpoint.service';
import {DateTime} from 'luxon';

@Injectable()
export class OfflineDataService {
  public answerSync: OfflineSynchronizeHandler<BasicAnswerResponse, Answer>;
  public applicationSync: OfflineSynchronizeHandler<ApplicationResponse, Application>;
  public categorySync: OfflineSynchronizeHandler<CategoryResponse, Category>;
  public contactSync: OfflineSynchronizeHandler<ContactResponse, Contact>;
  public countrySync: OfflineSynchronizeHandler<CountryResponse, Country>;
  public customerSync: OfflineSynchronizeHandler<CustomerResponse, Customer>;
  public delaySync: OfflineSynchronizeHandler<DelayResponse, Delay>;
  public generatorSync: OfflineSynchronizeHandler<GeneratorResponse, Generator>;
  public locationSync: OfflineSynchronizeHandler<LocationResponse, Location>;
  public motorSync: OfflineSynchronizeHandler<MotorResponse, Motor>;
  public QTASync: OfflineSynchronizeHandler<QTAResponse, QTA>;
  public technicianSync: OfflineSynchronizeHandler<BasicUserResponse, Technician>;
  public typeSync: OfflineSynchronizeHandler<TypeResponse, Type>;
  public unitSync: OfflineSynchronizeHandler<UnitResponse, Unit>;
  public userSync: OfflineSynchronizeHandler<BasicUserResponse, User>;

  constructor(
    private _unitOfWorkDatabase: UnitOfWorkDatabase,
    private _answerEndpointService: AnswerEndpointService,
    private _applicationEndpointService: ApplicationEndpointService,
    private _categoryEndpointService: CategoryEndpointService,
    private _contactEndpointService: ContactEndpointService,
    private _countryEndpointService: CountryEndpointService,
    private _customerEndpointService: CustomerEndpointService,
    private _delayEndpointService: DelayEndpointService,
    private _generatorEndpointService: GeneratorEndpointService,
    private _locationEndpointService: LocationEndpointService,
    private _motorEndpointService: MotorEndpointService,
    private _QTAEndpointService: QTAEndpointService,
    private _typeEndpointService: TypeEndpointService,
    private _unitEndpointService: UnitEndpointService,
    private _userEndpointService: UserEndpointService
  ) {
    this.answerSync = new OfflineSynchronizeHandler<BasicAnswerResponse, Answer>(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.answerRepository,
      () => this._answerEndpointService.basicAll(),
      'answers',
      (item) => ({
          id: item.id,
          userId: item.userId,
          type: item.reportType,
          folio: item.folio,
          countryId: item.countryId,
        })
    );
    this.applicationSync = new OfflineSynchronizeHandler<
      ApplicationResponse,
      Application
    >(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.applicationRepository,
      () => this._applicationEndpointService.all(),
      'applications',
      (item) => ({ id: item.id, name: item.name })
    );
    this.categorySync = new OfflineSynchronizeHandler<
      CategoryResponse,
      Category
    >(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.categoryRepository,
      () => this._categoryEndpointService.all(),
      'categories',
      (item) => ({ id: item.id, name: item.name })
    );
    this.contactSync = new OfflineSynchronizeHandler<ContactResponse, Contact>(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.contactRepository,
      () => this._contactEndpointService.all(),
      'contacts',
      (item) => ({ id: item.id, name: item.name, phone: item.phone, locationId: item.locationId })
    );
    this.countrySync = new OfflineSynchronizeHandler<CountryResponse, Country>(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.countryRepository,
      () => this._countryEndpointService.all(),
      'countries',
      (item) => ({ id: item.id, name: item.name })
    );
    this.customerSync = new OfflineSynchronizeHandler<
      CustomerResponse,
      Customer
    >(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.customerRepository,
      () => this._customerEndpointService.all(),
      'customers',
      (item) => ({ id: item.id, name: item.name })
    );
    this.delaySync = new OfflineSynchronizeHandler<DelayResponse, Delay>(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.delayRepository,
      () => this._delayEndpointService.all(),
      'delays',
      (item) => ({ id: item.id, name: item.name })
    );
    this.generatorSync = new OfflineSynchronizeHandler<
      GeneratorResponse,
      Generator
    >(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.generatorRepository,
      () => this._generatorEndpointService.all(),
      'generators',
      (item) => ({ id: item.id, name: item.name })
    );
    this.locationSync = new OfflineSynchronizeHandler<
      LocationResponse,
      Location
    >(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.locationRepository,
      () => this._locationEndpointService.all(),
      'locations',
      (item) => ({ id: item.id, name: item.name, customerId: item.customerId })
    );
    this.motorSync = new OfflineSynchronizeHandler<MotorResponse, Motor>(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.motorRepository,
      () => this._motorEndpointService.all(),
      'motors',
      (item) => ({ id: item.id, name: item.name })
    );
    this.QTASync = new OfflineSynchronizeHandler<QTAResponse, QTA>(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.QTARepository,
      () => this._QTAEndpointService.all(),
      'qtas',
      (item) => ({ id: item.id, name: item.name })
    );
    this.technicianSync = new OfflineSynchronizeHandler<
      BasicUserResponse,
      Technician
    >(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.technicianRepository,
      () => this._userEndpointService.basicTechnicianAll(),
      'technicians',
      (item) => ({ id: item.id, name: item.name, role: item.role })
    );
    this.typeSync = new OfflineSynchronizeHandler<TypeResponse, Type>(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.typeRepository,
      () => this._typeEndpointService.all(),
      'types',
      (item) => ({ id: item.id, name: item.name })
    );
    this.unitSync = new OfflineSynchronizeHandler<UnitResponse, Unit>(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.unitRepository,
      () => this._unitEndpointService.all(),
      'units',
      (item) => ({ id: item.id, name: item.name })
    );
    this.userSync = new OfflineSynchronizeHandler<BasicUserResponse, User>(
      this._unitOfWorkDatabase,
      this._unitOfWorkDatabase.userRepository,
      () => this._userEndpointService.basicAll(),
      'users',
      (item) => ({ id: item.id, name: item.name, role: item.role, wwid: item.wwid, phone: item.phone })
    );
  }

  public synchronizeAll(): void {
    this.answerSync.synchronize();
    this.applicationSync.synchronize();
    this.categorySync.synchronize();
    this.contactSync.synchronize();
    this.countrySync.synchronize();
    this.customerSync.synchronize();
    this.delaySync.synchronize();
    this.generatorSync.synchronize();
    this.locationSync.synchronize();
    this.motorSync.synchronize();
    this.QTASync.synchronize();
    this.technicianSync.synchronize();
    this.typeSync.synchronize();
    this.unitSync.synchronize();
    this.userSync.synchronize();
  }

  public initialize(): void {
    this.answerSync.initialize();
    this.applicationSync.initialize();
    this.categorySync.initialize();
    this.contactSync.initialize();
    this.countrySync.initialize();
    this.customerSync.initialize();
    this.delaySync.initialize();
    this.generatorSync.initialize();
    this.locationSync.initialize();
    this.motorSync.initialize();
    this.QTASync.initialize();
    this.technicianSync.initialize();
    this.typeSync.initialize();
    this.unitSync.initialize();
    this.userSync.initialize();
  }

  public delete(): void {
    this.answerSync.initialize();
    this.applicationSync.initialize();
    this.categorySync.initialize();
    this.contactSync.initialize();
    this.countrySync.initialize();
    this.customerSync.initialize();
    this.delaySync.initialize();
    this.generatorSync.initialize();
    this.locationSync.initialize();
    this.motorSync.initialize();
    this.QTASync.initialize();
    this.technicianSync.initialize();
    this.typeSync.initialize();
    this.unitSync.initialize();
    this.userSync.initialize();
  }
}
export class OfflineSynchronizeHandler<TResponse, TEntity> {
  private _total$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _lastSynchronization$: BehaviorSubject<DateTime | null> =
    new BehaviorSubject<DateTime | null>(null);
  private _state$: BehaviorSubject<OfflineSynchronizeState> =
    new BehaviorSubject<OfflineSynchronizeState>('idle');

  private _unitOfWorkDatabase: UnitOfWorkDatabase;
  private _repository: IBaseRepository<TEntity>;
  private _functionData: () => Observable<TResponse[]>;
  private _keySynchronizationTable: string;
  private _functionDataMapper: (dataSource: TResponse) => TEntity;

  constructor(
    unitOfWorkDatabase: UnitOfWorkDatabase,
    repository: IBaseRepository<TEntity>,
    functionData: () => Observable<TResponse[]>,
    keySynchronizationTable: string,
    functionDataMapper: (dataSource: TResponse) => TEntity
  ) {
    this._unitOfWorkDatabase = unitOfWorkDatabase;
    this._repository = repository;
    this._functionData = functionData;
    this._keySynchronizationTable = keySynchronizationTable;
    this._functionDataMapper = functionDataMapper;
  }

  public get total(): Observable<number> {
    return this._total$.asObservable().pipe(distinct());
  }

  public get synchronizedAt(): Observable<DateTime | null> {
    return this._lastSynchronization$.asObservable();
  }

  public get state(): Observable<OfflineSynchronizeState> {
    return this._state$.asObservable().pipe(distinct());
  }

  public initialize(): void {
    this.updateDataInfo();
  }

  public synchronize(): void {
    this._state$.next('synchronizing');
    this._functionData()
      .pipe(
        mergeMap<TResponse[], Observable<boolean>>((dataSource) => {
          const nData: TEntity[] = dataSource.map<TEntity>(
            this._functionDataMapper
          );
          return this._repository.bulkUpsert(nData).pipe(
            map((insertedData) => true),
            catchError((err) => of(false))
          );
        }),
        catchError((err) => of(false))
      )
      .subscribe((synchronizedSuccess) => {
        if (synchronizedSuccess) {
          this._state$.next('synchronized');
          this.updateDataInfo();
        } else {
          this._state$.next('synchronizationFailed');
        }
      });
  }

  public delete(): void {
    this._state$.next('synchronizing');
    this._repository.deleteAll().subscribe((value) => {
      this._state$.next('idle');
      this.updateDataInfo();
    });
  }

  private updateDataInfo(): void {
    forkJoin({
      count: this._repository.count().pipe(take(1)),
      lastSynchronization: this._unitOfWorkDatabase.synchronizationRepository
        .synchronizedAtByTable(this._keySynchronizationTable)
        .pipe(take(1)),
      currentSynchronization: this._unitOfWorkDatabase.synchronizationRepository
        .updateSynchronizedAtByTable(this._keySynchronizationTable, DateTime.now())
        .pipe(take(1)),
    }).subscribe((result) => {
      this._total$.next(result.count);
      this._lastSynchronization$.next(
        result.currentSynchronization || result.lastSynchronization
      );
    });
  }
}

export type OfflineSynchronizeState =
  | 'idle'
  | 'synchronizing'
  | 'synchronizationFailed'
  | 'synchronized';
