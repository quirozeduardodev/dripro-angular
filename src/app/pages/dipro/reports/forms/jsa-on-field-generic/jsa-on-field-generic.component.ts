/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Category } from 'src/app/database/models/category';
import { Unit } from 'src/app/database/models/unit';
import { User } from 'src/app/database/models/user';
import { UnitOfWorkDatabase } from 'src/app/database/unit-of-work.database';
import { AuthService } from 'src/app/services/auth.service';
import { BaseForm } from '../base-form';

@Component({
  selector: 'app-jsa-on-field-generic',
  templateUrl: './jsa-on-field-generic.component.html',
  styleUrls: ['./jsa-on-field-generic.component.scss'],
})
export class JsaOnFieldGenericComponent extends BaseForm implements OnInit {
  businessUnits$: Observable<Unit[]> | null = null;
  categoriesUnits$: Observable<Category[]> | null = null;
  technicians$: Observable<User[]> | null = null;

  commonOptions: { label: string; value: any }[] = [
    {
      label: 'forms.common.options.yes',
      value: 1,
    },
    {
      label: 'forms.common.options.no',
      value: 2,
    },
    {
      label: 'forms.common.options.na',
      value: 3,
    },
  ];

  groupSections: {
    label: string;
    questions: {
      label: string;
      formControlName: string;
      subOptions?: {
        fCNRiskLevel?: string;
        fCNControlled?: string;
        fCNCauseAnalysis?: string;
        fCNCauseAnalysisOther?: string;
        fCNTaken?: string;
        fCNTakenOther?: string;
      };
    }[];
  }[] = [
    {
      label: 'Prevención COVID',
      questions: [
        {
          label:
            '¿Cuentas con la mascarilla correcta para el trabajo a realizar?',
          formControlName: 'skin_face',
        },
        {
          label:
            '¿En las instalaciones del cliente está implementado el procedimiento de distanciamiento social?',
          formControlName: 'social',
        },
        {
          label: '¿Se cuenta con agua y jabón para la limpieza de manos?',
          formControlName: 'hand_cleaning',
        },
        {
          label:
            '¿Dispone de conos y cinta de precaución para mantener el distanciamiento social en su área de trabajo?',
          formControlName: 'social_precaution',
        },
        {
          label: '¿Cuentas con gel sanitizante para limpieza de manos?',
          formControlName: 'sanitizer',
        },
      ],
    },
    {
      label: 'Preparación',
      questions: [
        {
          label:
            '¿Si es necesario, ha completado la inducción de seguridad y/o comprende las reglas de seguridad del sitio?',
          formControlName: 'question1_generic',
          subOptions: {
            fCNRiskLevel: 'question2_generic',
            fCNControlled: 'question3_generic',
            fCNCauseAnalysis: 'question4_generic',
            fCNCauseAnalysisOther: 'question5_generic',
            fCNTaken: 'question6_generic',
            fCNTakenOther: 'question7_generic',
          },
        },
        {
          label:
            '¿Los arreglos de respuesta a emergencia están implementados y entendidos?',
          formControlName: 'question8_generic',
          subOptions: {
            fCNRiskLevel: 'question9_generic',
            fCNControlled: 'question10_generic',
            fCNCauseAnalysis: 'question11_generic',
            fCNCauseAnalysisOther: 'question12_generic',
            fCNTaken: 'question13_generic',
            fCNTakenOther: 'question14_generic',
          },
        },
        {
          label:
            '¿El área de trabajo está libre de otras actividades que pueden afectar a su seguridad?',
          formControlName: 'question15_generic',
          subOptions: {
            fCNRiskLevel: 'question16_generic',
            fCNControlled: 'question17_generic',
            fCNCauseAnalysis: 'question18_generic',
            fCNCauseAnalysisOther: 'question19_generic',
            fCNTaken: 'question20_generic',
            fCNTakenOther: 'question21_generic',
          },
        },
      ],
    },
    {
      label: 'Herramientas y Equipo',
      questions: [
        {
          label:
            '¿Las herramientas y equipos son adecuados y están libre de daños?',
          formControlName: 'question22_generic',
          subOptions: {
            fCNRiskLevel: 'question23_generic',
            fCNControlled: 'question24_generic',
            fCNCauseAnalysis: 'question25_generic',
            fCNCauseAnalysisOther: 'question26_generic',
            fCNTaken: 'question27_generic',
            fCNTakenOther: 'question28_generic',
          },
        },
        {
          label:
            '¿Es requerido el bloqueo y etiquetado y está completada la Lista de Verificación?',
          formControlName: 'question29_generic',
          subOptions: {
            fCNRiskLevel: 'question30_generic',
            fCNControlled: 'question31_generic',
            fCNCauseAnalysis: 'question32_generic',
            fCNCauseAnalysisOther: 'question33_generic',
            fCNTaken: 'question34_generic',
            fCNTakenOther: 'question35_generic',
          },
        },
      ],
    },
    {
      label: 'Levantamiento y Acceso',
      questions: [
        {
          label:
            '¿El levantamiento manual de piezas está dentro de su capacidad?',
          formControlName: 'question36_generic',
          subOptions: {
            fCNRiskLevel: 'question37_generic',
            fCNControlled: 'question38_generic',
            fCNCauseAnalysis: 'question39_generic',
            fCNCauseAnalysisOther: 'question40_generic',
            fCNTaken: 'question41_generic',
            fCNTakenOther: 'question42_generic',
          },
        },
        {
          label:
            '¿Hay un plan de levantamiento de equipos en el lugar y es comprendido por todos?',
          formControlName: 'question43_generic',
          subOptions: {
            fCNRiskLevel: 'question44_generic',
            fCNControlled: 'question45_generic',
            fCNCauseAnalysis: 'question46_generic',
            fCNCauseAnalysisOther: 'question47_generic',
            fCNTaken: 'question48_generic',
            fCNTakenOther: 'question49_generic',
          },
        },
        {
          label: '¿Hay un acceso seguro a la zona de trabajo y equipos?',
          formControlName: 'question50_generic',
          subOptions: {
            fCNRiskLevel: 'question51_generic',
            fCNControlled: 'question52_generic',
            fCNCauseAnalysis: 'question53_generic',
            fCNCauseAnalysisOther: 'question54_generic',
            fCNTaken: 'question55_generic',
            fCNTakenOther: 'question56_generic',
          },
        },
      ],
    },
    {
      label: 'Equipo de Proteccion Personal (EPP)',
      questions: [
        {
          label: '¿El EPP está disponible para la tarea?',
          formControlName: 'question57_generic',
          subOptions: {
            fCNRiskLevel: 'question58_generic',
            fCNControlled: 'question59_generic',
            fCNCauseAnalysis: 'question60_generic',
            fCNCauseAnalysisOther: 'question61_generic',
            fCNTaken: 'question62_generic',
            fCNTakenOther: 'question63_generic',
          },
        },
        {
          label: '¿El EPP es adecuado y está libre de daños?',
          formControlName: 'question64_generic',
          subOptions: {
            fCNRiskLevel: 'question65_generic',
            fCNControlled: 'question66_generic',
            fCNCauseAnalysis: 'question67_generic',
            fCNCauseAnalysisOther: 'question68_generic',
            fCNTaken: 'question69_generic',
            fCNTakenOther: 'question70_generic',
          },
        },
      ],
    },
  ];

  checkboxesP1: {
    formControlName: string;
    label: string;
    formControlName1: string;
    formControlName2: string;
  }[] = [
    {
      formControlName: 'question72_generic',
      label: 'VEHÍCULOS EN MOVIMIENTO',
      formControlName1: 'name1_question',
      formControlName2: 'name2_question',
    },
    {
      formControlName: 'question73_generic',
      label: 'TRABAJO CON ELECTRICIDAD',
      formControlName1: 'name3_question',
      formControlName2: 'name4_question',
    },
    {
      formControlName: 'question74_generic',
      label: 'MAQUINARIA EN MOVIMIENTO',
      formControlName1: 'name5_question',
      formControlName2: 'name6_question',
    },
    {
      formControlName: 'question75_generic',
      label: 'OPERACIÓN DE LEVANTAMIENTO DE CARGAS',
      formControlName1: 'name7_question',
      formControlName2: 'name8_question',
    },
    {
      formControlName: 'question76_generic',
      label: 'TRABAJOS DE ALTURA',
      formControlName1: 'name9_question',
      formControlName2: 'name10_question',
    },
    {
      formControlName: 'question77_generic',
      label: 'INCENDIO, EXPLOSIÓN O ARCO ELECTRICO',
      formControlName1: 'name11_question',
      formControlName2: 'name12_question',
    },
    {
      formControlName: 'question78_generic',
      label: 'OTRO',
      formControlName1: 'name13_question',
      formControlName2: 'name14_question',
    },
  ];

  nopOptionLevelRisk: { label: string; value: any }[] = [
    { label: 'Bajo', value: 1 },
    { label: 'Medio', value: 2 },
    { label: 'Alto', value: 3 },
    { label: 'Extremo', value: 4 },
  ];
  nopOptionControlled: { label: string; value: any }[] = [
    { label: 'Si', value: 1 },
    { label: 'No', value: 2 },
  ];
  nopOptionCauseAnalysis: { label: string; value: any }[] = [
    {
      label: 'Ambiente (clima, condiciones de altitud, instalaciones)',
      value: 1,
    },
    { label: 'Diseño de espacio de trabajo', value: 2 },
    { label: 'Entrenamiento inadecuado o incompleto', value: 3 },
    { label: 'Equipos o herramientas dañadas', value: 4 },
    { label: 'Herramientas/Equipos no disponibles', value: 5 },
    { label: 'Mantenimiento preventivo sin finalizar', value: 6 },
    { label: 'Procesos o procedimientos inadecuados', value: 7 },
    { label: 'Superficies de trabajo o caminos irregulares', value: 8 },
    { label: 'Otra', value: 9 },
  ];
  nopOptinsTaken: { label: string; value: any }[] = [
    { label: 'Asegurado', value: 1 },
    { label: 'Bloqueado', value: 2 },
    { label: 'Empleado entrenado', value: 3 },
    { label: 'Entrenado, Instalado, Limpiado', value: 4 },
    { label: 'Protegido', value: 5 },
    { label: 'Provisto (EPP)', value: 6 },
    { label: 'Reemplazado', value: 7 },
    { label: 'Removido', value: 8 },
    { label: 'Reparado', value: 9 },
    { label: 'Otro', value: 10 },
  ];

  formGroup: FormGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    job_order: new FormControl(null, [Validators.required]),
    name_people: new FormControl(null, [Validators.required]),
    wwid: new FormControl(null, [Validators.required]),
    unidad: new FormControl(null, [Validators.required]),
    accompanied: new FormControl(false),
    teammate_name: new FormControl([]),
    tageditor: new FormControl([]),
    task_category_generic: new FormControl(null, [Validators.required]),
    task_description: new FormControl(null, [Validators.required]),
    location: new FormControl(null, [Validators.required]),
    skin_face: new FormControl(null, [Validators.required]),
    social: new FormControl(null, [Validators.required]),
    hand_cleaning: new FormControl(null, [Validators.required]),
    social_precaution: new FormControl(null, [Validators.required]),
    sanitizer: new FormControl(null, [Validators.required]),
    question1_generic: new FormControl(null, [Validators.required]),
    question2_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question3_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question4_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question5_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question6_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question7_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question8_generic: new FormControl(null, [Validators.required]),
    question9_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question10_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question11_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question12_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question13_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question14_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question15_generic: new FormControl(null, [Validators.required]),
    question16_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question17_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question18_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question19_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question20_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question21_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question22_generic: new FormControl(null, [Validators.required]),
    question23_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question24_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question25_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question26_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question27_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question28_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question29_generic: new FormControl(null, [Validators.required]),
    question30_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question31_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question32_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question33_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question34_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question35_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question36_generic: new FormControl(null, [Validators.required]),
    question37_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question38_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question39_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question40_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question41_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question42_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question43_generic: new FormControl(null, [Validators.required]),
    question44_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question45_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question46_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question47_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question48_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question49_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question50_generic: new FormControl(null, [Validators.required]),
    question51_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question52_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question53_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question54_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question55_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question56_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question57_generic: new FormControl(null, [Validators.required]),
    question58_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question59_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question60_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question61_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question62_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question63_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question64_generic: new FormControl(null, [Validators.required]),
    question65_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question66_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question67_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question68_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question69_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question70_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question71_generic: new FormControl(null, [Validators.required]),
    question71_1_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question12_site: new FormControl(false),
    question72_generic: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name1_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name2_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question73_generic: new FormControl(false),
    name3_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name4_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question74_generic: new FormControl(false),
    name5_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name6_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question75_generic: new FormControl(false),
    name7_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name8_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question76_generic: new FormControl(false),
    name9_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name10_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question77_generic: new FormControl(false),
    name11_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name12_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question78_generic: new FormControl(false),
    name13_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name14_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question79_generic: new FormControl([]),
    question80_generic: new FormControl([]),
    question81_generic: new FormControl([]),
    question82_generic: new FormControl([]),
    question83_generic: new FormControl([]),
    question84_generic: new FormControl([]),
    question85_generic: new FormControl([]),
    question86_generic: new FormControl([]),
    question87_generic: new FormControl([]),
    question88_generic: new FormControl([]),
    different_unusual: new FormControl(null),
    name_manager: new FormControl(null, [Validators.required]),
    phone_manager: new FormControl(null, [Validators.required]),
    lotus_quest: new FormControl(null, [Validators.required]),
    loto: new FormControl([]),
    loto_energies: new FormControl([]),
    photos: new FormControl([], [Validators.maxLength(4)]),
  });
  constructor(
    private unitOfWorkDatabase: UnitOfWorkDatabase,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.businessUnits$ = this.unitOfWorkDatabase.unitRepository.all();
    this.categoriesUnits$ = this.unitOfWorkDatabase.categoryRepository.all();
    this.technicians$ = this.unitOfWorkDatabase.userRepository.all();

    this.formGroup.controls.date.disable();
    this.formGroup.controls.date.setValue(moment().format('YYYY-MM-d'));

    this.formGroup.controls.name_people.disable();
    this.formGroup.controls.wwid.disable();

    this.authService.user.pipe(take(1)).subscribe((user) => {
      this.formGroup.controls.name_people.setValue(user?.name ?? '');
      this.formGroup.controls.wwid.setValue(user?.wwid ?? '');
    });
  }

  submit(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    this.onSubmit.emit(this.formGroup.value);
  }
}
