/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  selector: 'app-jsa-on-field-power-generation',
  templateUrl: './jsa-on-field-power-generation.component.html',
  styleUrls: ['./jsa-on-field-power-generation.component.scss'],
})
export class JsaOnFieldPowerGenerationComponent extends BaseForm implements OnInit {
  businessUnits$: Observable<Unit[]> | null = null;
  categoriesUnits$: Observable<Category[]> | null = null;
  technicians$: Observable<User[]> | null = null;

  commonOptions: { label: string; value: any }[] = [
    {
      label: 'Si',
      value: 1,
    },
    {
      label: 'No',
      value: 2,
    },
    {
      label: 'N/A',
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
          formControlName: 'question1_powergen',
          subOptions: {
            fCNRiskLevel: 'question2_powergen',
            fCNControlled: 'question3_powergen',
            fCNCauseAnalysis: 'question4_powergen',
            fCNCauseAnalysisOther: 'question5_powergen',
            fCNTaken: 'question6_powergen',
            fCNTakenOther: 'question7_powergen',
          },
        },
        {
          label:
            '¿Los arreglos de respuesta a emergencia están implementados y entendidos?',
          formControlName: 'question8_powergen',
          subOptions: {
            fCNRiskLevel: 'question9_powergen',
            fCNControlled: 'question10_powergen',
            fCNCauseAnalysis: 'question11_powergen',
            fCNCauseAnalysisOther: 'question12_powergen',
            fCNTaken: 'question13_powergen',
            fCNTakenOther: 'question14_powergen',
          },
        },
        {
          label:
            '¿El área de trabajo está libre de otras actividades que pueden afectar a su seguridad?',
          formControlName: 'question15_powergen',
          subOptions: {
            fCNRiskLevel: 'question16_powergen',
            fCNControlled: 'question17_powergen',
            fCNCauseAnalysis: 'question18_powergen',
            fCNCauseAnalysisOther: 'question19_powergen',
            fCNTaken: 'question20_powergen',
            fCNTakenOther: 'question21_powergen',
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
          formControlName: 'question22_powergen',
          subOptions: {
            fCNRiskLevel: 'question23_powergen',
            fCNControlled: 'question24_powergen',
            fCNCauseAnalysis: 'question25_powergen',
            fCNCauseAnalysisOther: 'question26_powergen',
            fCNTaken: 'question27_powergen',
            fCNTakenOther: 'question28_powergen',
          },
        },
        {
          label:
            '¿Es requerido el bloqueo y etiquetado y está completada la Lista de Verificación?',
          formControlName: 'question29_powergen',
          subOptions: {
            fCNRiskLevel: 'question30_powergen',
            fCNControlled: 'question31_powergen',
            fCNCauseAnalysis: 'question32_powergen',
            fCNCauseAnalysisOther: 'question33_powergen',
            fCNTaken: 'question34_powergen',
            fCNTakenOther: 'question35_powergen',
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
          formControlName: 'question36_powergen',
          subOptions: {
            fCNRiskLevel: 'question37_powergen',
            fCNControlled: 'question38_powergen',
            fCNCauseAnalysis: 'question39_powergen',
            fCNCauseAnalysisOther: 'question40_powergen',
            fCNTaken: 'question41_powergen',
            fCNTakenOther: 'question42_powergen',
          },
        },
        {
          label:
            '¿Hay un plan de levantamiento de equipos en el lugar y es comprendido por todos?',
          formControlName: 'question43_powergen',
          subOptions: {
            fCNRiskLevel: 'question44_powergen',
            fCNControlled: 'question45_powergen',
            fCNCauseAnalysis: 'question46_powergen',
            fCNCauseAnalysisOther: 'question47_powergen',
            fCNTaken: 'question48_powergen',
            fCNTakenOther: 'question49_powergen',
          },
        },
        {
          label: '¿Hay un acceso seguro a la zona de trabajo y equipos?',
          formControlName: 'question50_powergen',
          subOptions: {
            fCNRiskLevel: 'question51_powergen',
            fCNControlled: 'question52_powergen',
            fCNCauseAnalysis: 'question53_powergen',
            fCNCauseAnalysisOther: 'question54_powergen',
            fCNTaken: 'question55_powergen',
            fCNTakenOther: 'question56_powergen',
          },
        },
      ],
    },
    {
      label: 'Equipo de Proteccion Personal (EPP)',
      questions: [
        {
          label: '¿El EPP está disponible para la tarea?',
          formControlName: 'question57_powergen',
          subOptions: {
            fCNRiskLevel: 'question58_powergen',
            fCNControlled: 'question59_powergen',
            fCNCauseAnalysis: 'question60_powergen',
            fCNCauseAnalysisOther: 'question61_powergen',
            fCNTaken: 'question62_powergen',
            fCNTakenOther: 'question63_powergen',
          },
        },
        {
          label: '¿El EPP es adecuado y está libre de daños?',
          formControlName: 'question64_powergen',
          subOptions: {
            fCNRiskLevel: 'question65_powergen',
            fCNControlled: 'question66_powergen',
            fCNCauseAnalysis: 'question67_powergen',
            fCNCauseAnalysisOther: 'question68_powergen',
            fCNTaken: 'question69_powergen',
            fCNTakenOther: 'question70_powergen',
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
      formControlName: 'question72_powergen',
      label: 'VEHÍCULOS EN MOVIMIENTO',
      formControlName1: 'name1_question',
      formControlName2: 'name2_question',
    },
    {
      formControlName: 'question73_powergen',
      label: 'TRABAJO CON ELECTRICIDAD',
      formControlName1: 'name3_question',
      formControlName2: 'name4_question',
    },
    {
      formControlName: 'question74_powergen',
      label: 'MAQUINARIA EN MOVIMIENTO',
      formControlName1: 'name5_question',
      formControlName2: 'name6_question',
    },
    {
      formControlName: 'question75_powergen',
      label: 'OPERACIÓN DE LEVANTAMIENTO DE CARGAS',
      formControlName1: 'name7_question',
      formControlName2: 'name8_question',
    },
    {
      formControlName: 'question76_powergen',
      label: 'TRABAJOS DE ALTURA',
      formControlName1: 'name9_question',
      formControlName2: 'name10_question',
    },
    {
      formControlName: 'question77_powergen',
      label: 'INCENDIO, EXPLOSIÓN O ARCO ELECTRICO',
      formControlName1: 'name11_question',
      formControlName2: 'name12_question',
    },
    {
      formControlName: 'question78_powergen',
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
    task_category_power: new FormControl(null, [Validators.required]),
    task_description: new FormControl(null, [Validators.required]),
    location: new FormControl(null, [Validators.required]),
    skin_face: new FormControl(null, [Validators.required]),
    social: new FormControl(null, [Validators.required]),
    hand_cleaning: new FormControl(null, [Validators.required]),
    social_precaution: new FormControl(null, [Validators.required]),
    sanitizer: new FormControl(null, [Validators.required]),
    question1_powergen: new FormControl(null, [Validators.required]),
    question2_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question3_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question4_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question5_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question6_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question7_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question8_powergen: new FormControl(null, [Validators.required]),
    question9_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question10_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question11_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question12_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question13_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question14_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question15_powergen: new FormControl(null, [Validators.required]),
    question16_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question17_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question18_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question19_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question20_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question21_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question22_powergen: new FormControl(null, [Validators.required]),
    question23_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question24_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question25_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question26_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question27_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question28_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question29_powergen: new FormControl(null, [Validators.required]),
    question30_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question31_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question32_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question33_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question34_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question35_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question36_powergen: new FormControl(null, [Validators.required]),
    question37_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question38_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question39_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question40_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question41_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question42_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question43_powergen: new FormControl(null, [Validators.required]),
    question44_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question45_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question46_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question47_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question48_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question49_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question50_powergen: new FormControl(null, [Validators.required]),
    question51_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question52_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question53_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question54_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question55_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question56_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question57_powergen: new FormControl(null, [Validators.required]),
    question58_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question59_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question60_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question61_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question62_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question63_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question64_powergen: new FormControl(null, [Validators.required]),
    question65_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question66_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question67_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question68_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question69_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question70_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question71_powergen: new FormControl(null, [Validators.required]),
    question71_1_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question12_site: new FormControl(false),
    question72_powergen: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name1_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name2_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question73_powergen: new FormControl(false),
    name3_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name4_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question74_powergen: new FormControl(false),
    name5_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name6_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question75_powergen: new FormControl(false),
    name7_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name8_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question76_powergen: new FormControl(false),
    name9_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name10_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question77_powergen: new FormControl(false),
    name11_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name12_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question78_powergen: new FormControl(false),
    name13_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name14_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question79_powergen: new FormControl([]),
    question80_powergen: new FormControl([]),
    question81_powergen: new FormControl([]),
    question82_powergen: new FormControl([]),
    question83_powergen: new FormControl([]),
    question84_powergen: new FormControl([]),
    question85_powergen: new FormControl([]),
    question86_powergen: new FormControl([]),
    question87_powergen: new FormControl([]),
    question88_powergen: new FormControl([]),
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
