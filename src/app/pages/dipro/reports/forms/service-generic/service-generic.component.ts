/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {combineLatest, forkJoin, Observable} from 'rxjs';
import { Answer } from 'src/app/database/models/answer';
import { Application } from 'src/app/database/models/application';
import { Category } from 'src/app/database/models/category';
import { Contact } from 'src/app/database/models/contact';
import { Customer } from 'src/app/database/models/customer';
import { Generator } from 'src/app/database/models/generator';
import { Location } from 'src/app/database/models/location';
import { Motor } from 'src/app/database/models/motor';
import { QTA } from 'src/app/database/models/qta';
import { Type } from 'src/app/database/models/type';
import { Unit } from 'src/app/database/models/unit';
import { User } from 'src/app/database/models/user';
import { UnitOfWorkDatabase } from 'src/app/database/unit-of-work.database';
import { AuthService } from 'src/app/services/auth.service';
import {BaseForm, OnAnswer} from '../base-form';
import {Delay} from '../../../../../database/models/delay';
import {Technician} from '../../../../../database/models/technician';
import {distinct, map, mergeMap, startWith, take} from 'rxjs/operators';

@Component({
  selector: 'app-service-generic',
  templateUrl: './service-generic.component.html',
  styleUrls: ['./service-generic.component.scss'],
})
export class ServiceGenericComponent extends BaseForm implements OnInit, OnAnswer {
  x = 'root';
  jsaReports$: Observable<Answer[]> | null = null;
  businessUnits$: Observable<Unit[]> | null = null;
  customers$: Observable<Customer[]> | null = null;
  locations$: Observable<Location[]> | null = null;
  contacts$: Observable<Contact[]> | null = null;
  technicians$: Observable<Technician[]> | null = null;
  jobTypes$: Observable<Type[]> | null = null;
  applications$: Observable<Application[]> | null = null;
  generators$: Observable<Generator[]> | null = null;
  motors$: Observable<Motor[]> | null = null;
  qtas$: Observable<QTA[]> | null = null;
  categories$: Observable<Category[]> | null = null;
  delays$: Observable<Delay[]> | null = null;
  measurementTypes: {id: number; name: string}[] = [
    {
      id: 1,
      name: 'forms.common.measurements.hrs'
    },
    {
      id: 2,
      name: 'forms.common.measurements.km'
    }
  ];
  formGroup = new FormGroup({
    job_order: new FormControl(null, [Validators.required]),
    no_jsa: new FormControl(null, [Validators.required]),
    unidad: new FormControl(null, [Validators.required]),
    customer: new FormControl(null, [Validators.required]),
    location: new FormControl(null, [Validators.required]),
    location_gps: new FormControl(null, [Validators.required]),
    contact: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    sucursal: new FormControl(null, [Validators.required]),
    accompanied: new FormControl(false),
    teammate_name: new FormControl([]),
    tageditor: new FormControl([], []),
    type_job: new FormControl(null, [Validators.required]),
    application: new FormControl(null, [Validators.required]),
    model: new FormControl(null, [Validators.required]),
    model_num: new FormControl(null, [Validators.required]),
    model_type: new FormControl(null, [Validators.required]),
    model_gene: new FormControl(null, [Validators.required]),
    num_serie_gen: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    model_motor: new FormControl(null, [Validators.required]),
    num_serie_motor: new FormControl(null, [Validators.required]),
    potencia: new FormControl(null, [Validators.required]),
    model_qta: new FormControl(null, [Validators.required]),
    num_serie_qta: new FormControl(null, [Validators.required]),
    symptom: new FormControl(null, [Validators.required]),
    problem: new FormControl(null, [Validators.required]),
    cause: new FormControl(null, [Validators.required]),
    solution: new FormControl(null, [Validators.required]),
    pending: new FormControl(null, [Validators.required]),
    available: new FormControl(null, [Validators.required]),
    photosz: new FormControl(null, [Validators.required]),
    'photo-description': new FormControl(null, [Validators.required]),
    technician_name: new FormControl(null, [Validators.required]),
    initial_hour: new FormControl(null, [Validators.required]),
    finally_hour: new FormControl(null, [Validators.required]),
    category_technician: new FormControl(null, [Validators.required]),
    demoras_technician: new FormControl(null, []),
    responsable: new FormControl(null, [Validators.required]),
    department: new FormControl(null, [Validators.required]),
    email_client: new FormControl(null, [Validators.required, Validators.email]),
    signature_client: new FormControl(null, [Validators.required]),
    name_technician: new FormControl(null, [Validators.required]),
    signature_technician: new FormControl(null, [Validators.required]),
  });

  constructor(
    private unitOfWorkDatabase: UnitOfWorkDatabase,
    private authService: AuthService
  ){
    super();
  }

  ngOnInit() {
    this.jsaReports$ = this.unitOfWorkDatabase.answerRepository.all();
    this.businessUnits$ = this.unitOfWorkDatabase.unitRepository.all();
    this.customers$ = this.unitOfWorkDatabase.customerRepository.all();
    this.technicians$ = this.unitOfWorkDatabase.technicianRepository.all()
      .pipe(map(all => all.sort((a, b) => a.name.localeCompare(b.name))));
    this.jobTypes$ = this.unitOfWorkDatabase.typeRepository.all();
    this.applications$ = this.unitOfWorkDatabase.applicationRepository.all();
    this.generators$ = this.unitOfWorkDatabase.generatorRepository.all();
    this.motors$ = this.unitOfWorkDatabase.motorRepository.all();
    this.qtas$ = this.unitOfWorkDatabase.QTARepository.all();
    this.categories$ = this.unitOfWorkDatabase.categoryRepository.all();
    this.delays$ = this.unitOfWorkDatabase.delayRepository.all();

  }

  submit(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      this.scrollToFirstInvalidControl();
      return;
    }
    this.onSubmit.emit(this.formGroup.value);
  }

  onAnswersUpdated(answers: { [p: string]: any }): void {
    this.formGroup.controls.customer.valueChanges.subscribe(value => {
      this.locations$ = this.unitOfWorkDatabase.customerRepository.all()
        .pipe(mergeMap(customers => {
          let customerId: number | null = null;
          for (const customer of customers) {
            if(customer.name === value) {
              customerId = customer.id;
              break;
            }
          }
          return this.unitOfWorkDatabase.locationRepository.all()
            .pipe(map(all => {
              const filtered: Location[] = [];
              if(customerId) {
                for (const location of all) {
                  if(location.customerId === customerId) {
                    filtered.push(location);
                  }
                }
              }
              return filtered;
            }));
        }));
    });
    this.formGroup.controls.location.valueChanges.subscribe(value => {
      this.contacts$ = this.unitOfWorkDatabase.locationRepository.all()
        .pipe(mergeMap(locations => {
          let locationId: number | null = null;
          for (const location of locations) {
            if(location.name === value) {
              locationId = location.id;
              break;
            }
          }
          return this.unitOfWorkDatabase.contactRepository.all()
            .pipe(map(all => {
              const filtered: Contact[] = [];
              if(locationId) {
                for (const contact of all) {
                  if(contact.locationId === locationId) {
                    filtered.push(contact);
                  }
                }
              }
              return filtered;
            }));
        }));
    });
    this.formGroup.controls.contact.valueChanges.subscribe(value => {
      this.unitOfWorkDatabase.contactRepository.all()
        .subscribe(contacts => {
          for (const contact of contacts) {
            if(contact.name === value) {
              this.formGroup.controls.phone.setValue(contact.phone);
              break;
            }
          }
        });
    });

    if(!answers.sucursal) {
      this.authService.user.pipe(take(1)).subscribe((user) => {
        this.formGroup.controls.sucursal.setValue(user?.sitio ?? '');
      });
    }

    combineLatest([
      this.formGroup.controls.model_gene.valueChanges.pipe(startWith(answers.model_gene ?? null), distinct()),
      this.formGroup.controls.model_motor.valueChanges.pipe(startWith(answers.model_motor ?? null), distinct()),
      this.formGroup.controls.model_qta.valueChanges.pipe(startWith(answers.model_qta ?? null), distinct())])
      .subscribe(([modelGen, modelMotor, modelQTA]) => {
        console.log(modelGen, modelMotor, modelQTA);
        this.formGroup.controls.model_gene.setValidators(null);
        this.formGroup.controls.num_serie_gen.setValidators(null);

        this.formGroup.controls.model_motor.setValidators(null);
        this.formGroup.controls.num_serie_motor.setValidators(null);

        this.formGroup.controls.model_qta.setValidators(null);
        this.formGroup.controls.num_serie_qta.setValidators(null);

        this.formGroup.controls.model_gene.updateValueAndValidity();
        this.formGroup.controls.num_serie_gen.updateValueAndValidity();
        this.formGroup.controls.model_motor.updateValueAndValidity();
        this.formGroup.controls.num_serie_motor.updateValueAndValidity();
        this.formGroup.controls.model_qta.updateValueAndValidity();
        this.formGroup.controls.num_serie_qta.updateValueAndValidity();

        if(!modelGen && !modelMotor) {
          this.formGroup.controls.model_qta.setValidators([Validators.required]);
          this.formGroup.controls.num_serie_qta.setValidators([Validators.required]);
        }

        if(!modelGen && !modelQTA) {
          this.formGroup.controls.model_motor.setValidators([Validators.required]);
          this.formGroup.controls.num_serie_motor.setValidators([Validators.required]);
        }

        if(!modelMotor && !modelQTA) {
          this.formGroup.controls.model_gene.setValidators([Validators.required]);
          this.formGroup.controls.num_serie_gen.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
        }
      });
  }
}
