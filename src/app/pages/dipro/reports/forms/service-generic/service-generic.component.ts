/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
import { BaseForm } from '../base-form';

@Component({
  selector: 'app-service-generic',
  templateUrl: './service-generic.component.html',
  styleUrls: ['./service-generic.component.scss'],
})
export class ServiceGenericComponent extends BaseForm implements OnInit {
  x = 'root';
  jsaReports$: Observable<Answer[]> | null = null;
  businessUnits$: Observable<Unit[]> | null = null;
  customers$: Observable<Customer[]> | null = null;
  locations$: Observable<Location[]> | null = null;
  contacts$: Observable<Contact[]> | null = null;
  technicians$: Observable<User[]> | null = null;
  jobTypes$: Observable<Type[]> | null = null;
  applications$: Observable<Application[]> | null = null;
  generators$: Observable<Generator[]> | null = null;
  motors$: Observable<Motor[]> | null = null;
  qtas$: Observable<QTA[]> | null = null;
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
    tageditor: new FormControl([], [Validators.required]),
    type_job: new FormControl(null, [Validators.required]),
    application: new FormControl(null, [Validators.required]),
    model: new FormControl(null, [Validators.required]),
    model_num: new FormControl(null, [Validators.required]),
    model_type: new FormControl(null, [Validators.required]),
    model_gene: new FormControl(null, [Validators.required]),
    num_serie_gen: new FormControl(null, [Validators.required]),
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
    this.locations$ = this.unitOfWorkDatabase.locationRepository.all();
    this.contacts$ = this.unitOfWorkDatabase.contactRepository.all();
    this.technicians$ = this.unitOfWorkDatabase.technicianRepository.all();
    this.jobTypes$ = this.unitOfWorkDatabase.typeRepository.all();
    this.applications$ = this.unitOfWorkDatabase.applicationRepository.all();
    this.generators$ = this.unitOfWorkDatabase.generatorRepository.all();
    this.motors$ = this.unitOfWorkDatabase.motorRepository.all();
    this.qtas$ = this.unitOfWorkDatabase.QTARepository.all();
  }

  submit(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    this.onSubmit.emit(this.formGroup.value);
  }
}
