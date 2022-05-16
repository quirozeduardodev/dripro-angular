/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {DateTime} from 'luxon';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { Category } from 'src/app/database/models/category';
import { Unit } from 'src/app/database/models/unit';
import { User } from 'src/app/database/models/user';
import { UnitOfWorkDatabase } from 'src/app/database/unit-of-work.database';
import { AuthService } from 'src/app/services/auth.service';
import { BaseForm } from '../base-form';
import {Technician} from '../../../../../database/models/technician';

@Component({
  selector: 'app-jsa-on-field-generic',
  templateUrl: './jsa-on-field-generic.component.html',
  styleUrls: ['./jsa-on-field-generic.component.scss'],
})
export class JsaOnFieldGenericComponent extends BaseForm implements OnInit {
  businessUnits$: Observable<Unit[]> | null = null;
  categoriesUnits$: Observable<Category[]> | null = null;
  technicians$: Observable<Technician[]> | null = null;

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

  commonOptionsYesOrNo: { label: string; value: any }[] = [
    {
      label: 'forms.common.options.yes',
      value: 1,
    },
    {
      label: 'forms.common.options.no',
      value: 2,
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
      label: 'forms.jsa.field.generic.covidPrevention.title',
      questions: [
        {
          label:
            'forms.jsa.field.generic.covidPrevention.question1',
          formControlName: 'skin_face',
        },
        {
          label:
            'forms.jsa.field.generic.covidPrevention.question2',
          formControlName: 'social',
        },
        {
          label: 'forms.jsa.field.generic.covidPrevention.question3',
          formControlName: 'hand_cleaning',
        },
        {
          label:
            'forms.jsa.field.generic.covidPrevention.question4',
          formControlName: 'social_precaution',
        },
        {
          label: 'forms.jsa.field.generic.covidPrevention.question5',
          formControlName: 'sanitizer',
        },
      ],
    },
    {
      label: 'forms.jsa.field.generic.preparation.title',
      questions: [
        {
          label:
            'forms.jsa.field.generic.preparation.question1',
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
            'forms.jsa.field.generic.preparation.question2',
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
            'forms.jsa.field.generic.preparation.question3',
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
      label: 'forms.jsa.field.generic.toolsAndEquipment.title',
      questions: [
        {
          label:
            'forms.jsa.field.generic.toolsAndEquipment.question1',
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
            'forms.jsa.field.generic.toolsAndEquipment.question2',
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
      label: 'forms.jsa.field.generic.access.title',
      questions: [
        {
          label:
            'forms.jsa.field.generic.access.question1',
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
            'forms.jsa.field.generic.access.question2',
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
          label: 'forms.jsa.field.generic.access.question3',
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
      label: 'forms.jsa.field.generic.epp.title',
      questions: [
        {
          label:
            'forms.jsa.field.generic.epp.question1',
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
          label:
            'forms.jsa.field.generic.epp.question2',
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
      label: 'forms.jsa.field.generic.checkboxesP1.chbx1',
      formControlName1: 'name1_question',
      formControlName2: 'name2_question',
    },
    {
      formControlName: 'question73_generic',
      label: 'forms.jsa.field.generic.checkboxesP1.chbx2',
      formControlName1: 'name3_question',
      formControlName2: 'name4_question',
    },
    {
      formControlName: 'question74_generic',
      label: 'forms.jsa.field.generic.checkboxesP1.chbx7',
      formControlName1: 'name5_question',
      formControlName2: 'name6_question',
    },
    {
      formControlName: 'question75_generic',
      label: 'forms.jsa.field.generic.checkboxesP1.chbx3',
      formControlName1: 'name7_question',
      formControlName2: 'name8_question',
    },
    {
      formControlName: 'question76_generic',
      label: 'forms.jsa.field.generic.checkboxesP1.chbx4',
      formControlName1: 'name9_question',
      formControlName2: 'name10_question',
    },
    {
      formControlName: 'question77_generic',
      label: 'forms.jsa.field.generic.checkboxesP1.chbx5',
      formControlName1: 'name11_question',
      formControlName2: 'name12_question',
    },
    {
      formControlName: 'question78_generic',
      label: 'forms.jsa.field.generic.checkboxesP1.chbx6',
      formControlName1: 'name13_question',
      formControlName2: 'name14_question',
    },
  ];

  nopOptionLevelRisk: { label: string; value: any }[] = [
    { label: 'forms.common.labels.low', value: 1 },
    { label: 'forms.common.labels.medium', value: 2 },
    { label: 'forms.common.labels.high', value: 3 },
    { label: 'forms.common.labels.extreme', value: 4 },
  ];
  nopOptionControlled: { label: string; value: any }[] = [
    { label: 'forms.common.options.yes', value: 1 },
    { label: 'forms.common.options.no', value: 2 },
  ];
  nopOptionCauseAnalysis: { label: string; value: any }[] = [
    {
      label: 'forms.common.analisisCause.atmosphere',
      value: 1,
    },
    { label: 'forms.common.analisisCause.design', value: 2 },
    { label: 'forms.common.analisisCause.training', value: 3 },
    { label: 'forms.common.analisisCause.teams', value: 4 },
    { label: 'forms.common.analisisCause.tools', value: 5 },
    { label: 'forms.common.analisisCause.maintenance', value: 6 },
    { label: 'forms.common.analisisCause.process', value: 7 },
    { label: 'forms.common.analisisCause.surfaces', value: 8 },
    { label: 'forms.common.analisisCause.other', value: 9 },
  ];
  nopOptinsTaken: { label: string; value: any }[] = [
    { label: 'forms.common.actionsTaken.insured', value: 1 },
    { label: 'forms.common.actionsTaken.locked', value: 2 },
    { label: 'forms.common.actionsTaken.trained', value: 3 },
    { label: 'forms.common.actionsTaken.trained_installed', value: 4 },
    { label: 'forms.common.actionsTaken.protected', value: 5 },
    { label: 'forms.common.actionsTaken.provided', value: 6 },
    { label: 'forms.common.actionsTaken.superseded', value: 7 },
    { label: 'forms.common.actionsTaken.removed', value: 8 },
    { label: 'forms.common.actionsTaken.repaired', value: 9 },
    { label: 'forms.common.actionsTaken.other', value: 10 },
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
    question2_generic: new FormControl(null, [Validators.required]),
    question3_generic: new FormControl(null, [Validators.required]),
    question4_generic: new FormControl(null, [Validators.required]),
    question5_generic: new FormControl(null, [Validators.required]),
    question6_generic: new FormControl(null, [Validators.required]),
    question7_generic: new FormControl(null, [Validators.required]),
    question8_generic: new FormControl(null, [Validators.required]),
    question9_generic: new FormControl(null, [Validators.required]),
    question10_generic: new FormControl(null, [Validators.required]),
    question11_generic: new FormControl(null, [Validators.required]),
    question12_generic: new FormControl(null, [Validators.required]),
    question13_generic: new FormControl(null, [Validators.required]),
    question14_generic: new FormControl(null, [Validators.required]),
    question15_generic: new FormControl(null, [Validators.required]),
    question16_generic: new FormControl(null, [Validators.required]),
    question17_generic: new FormControl(null, [Validators.required]),
    question18_generic: new FormControl(null, [Validators.required]),
    question19_generic: new FormControl(null, [Validators.required]),
    question20_generic: new FormControl(null, [Validators.required]),
    question21_generic: new FormControl(null, [Validators.required]),
    question22_generic: new FormControl(null, [Validators.required]),
    question23_generic: new FormControl(null, [Validators.required]),
    question24_generic: new FormControl(null, [Validators.required]),
    question25_generic: new FormControl(null, [Validators.required]),
    question26_generic: new FormControl(null, [Validators.required]),
    question27_generic: new FormControl(null, [Validators.required]),
    question28_generic: new FormControl(null, [Validators.required]),
    question29_generic: new FormControl(null, [Validators.required]),
    question30_generic: new FormControl(null, [Validators.required]),
    question31_generic: new FormControl(null, [Validators.required]),
    question32_generic: new FormControl(null, [Validators.required]),
    question33_generic: new FormControl(null, [Validators.required]),
    question34_generic: new FormControl(null, [Validators.required]),
    question35_generic: new FormControl(null, [Validators.required]),
    question36_generic: new FormControl(null, [Validators.required]),
    question37_generic: new FormControl(null, [Validators.required]),
    question38_generic: new FormControl(null, [Validators.required]),
    question39_generic: new FormControl(null, [Validators.required]),
    question40_generic: new FormControl(null, [Validators.required]),
    question41_generic: new FormControl(null, [Validators.required]),
    question42_generic: new FormControl(null, [Validators.required]),
    question43_generic: new FormControl(null, [Validators.required]),
    question44_generic: new FormControl(null, [Validators.required]),
    question45_generic: new FormControl(null, [Validators.required]),
    question46_generic: new FormControl(null, [Validators.required]),
    question47_generic: new FormControl(null, [Validators.required]),
    question48_generic: new FormControl(null, [Validators.required]),
    question49_generic: new FormControl(null, [Validators.required]),
    question50_generic: new FormControl(null, [Validators.required]),
    question51_generic: new FormControl(null, [Validators.required]),
    question52_generic: new FormControl(null, [Validators.required]),
    question53_generic: new FormControl(null, [Validators.required]),
    question54_generic: new FormControl(null, [Validators.required]),
    question55_generic: new FormControl(null, [Validators.required]),
    question56_generic: new FormControl(null, [Validators.required]),
    question57_generic: new FormControl(null, [Validators.required]),
    question58_generic: new FormControl(null, [Validators.required]),
    question59_generic: new FormControl(null, [Validators.required]),
    question60_generic: new FormControl(null, [Validators.required]),
    question61_generic: new FormControl(null, [Validators.required]),
    question62_generic: new FormControl(null, [Validators.required]),
    question63_generic: new FormControl(null, [Validators.required]),
    question64_generic: new FormControl(null, [Validators.required]),
    question65_generic: new FormControl(null, [Validators.required]),
    question66_generic: new FormControl(null, [Validators.required]),
    question67_generic: new FormControl(null, [Validators.required]),
    question68_generic: new FormControl(null, [Validators.required]),
    question69_generic: new FormControl(null, [Validators.required]),
    question70_generic: new FormControl(null, [Validators.required]),
    question71_generic: new FormControl(null, [Validators.required]),
    question71_1_generic: new FormControl(null, [Validators.required]),
    question72_generic: new FormControl(null, [Validators.required]),
    name1_question: new FormControl(null, [Validators.required]),
    name2_question: new FormControl(null, [Validators.required]),
    question73_generic: new FormControl(null, [Validators.required]),
    name3_question: new FormControl(null, [Validators.required]),
    name4_question: new FormControl(null, [Validators.required]),
    question74_generic: new FormControl(null, [Validators.required]),
    name5_question: new FormControl(null, [Validators.required]),
    name6_question: new FormControl(null, [Validators.required]),
    question75_generic: new FormControl(null, [Validators.required]),
    name7_question: new FormControl(null, [Validators.required]),
    name8_question: new FormControl(null, [Validators.required]),
    question76_generic: new FormControl(null, [Validators.required]),
    name9_question: new FormControl(null, [Validators.required]),
    name10_question: new FormControl(null, [Validators.required]),
    question77_generic: new FormControl(null, [Validators.required]),
    name11_question: new FormControl(null, [Validators.required]),
    name12_question: new FormControl(null, [Validators.required]),
    question78_generic: new FormControl(null, [Validators.required]),
    name13_question: new FormControl(null, [Validators.required]),
    name14_question: new FormControl(null, [Validators.required]),
    question79_generic: new FormControl(null, [Validators.required]),
    question80_generic: new FormControl(null, [Validators.required]),
    question81_generic: new FormControl(null, [Validators.required]),
    question82_generic: new FormControl(null, [Validators.required]),
    question83_generic: new FormControl(null, [Validators.required]),
    question84_generic: new FormControl(null, [Validators.required]),
    question85_generic: new FormControl(null, [Validators.required]),
    question86_generic: new FormControl(null, [Validators.required]),
    question87_generic: new FormControl(null, [Validators.required]),
    question88_generic: new FormControl(null, [Validators.required]),

    different_unnusual: new FormControl(null, [Validators.required]),
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

  ngOnInit(): void {
    this.businessUnits$ = this.unitOfWorkDatabase.unitRepository.all();
    this.categoriesUnits$ = this.unitOfWorkDatabase.categoryRepository.all();
    this.technicians$ = this.unitOfWorkDatabase.technicianRepository.all();
  }

  onAnswersUpdated(answers: {[p: string]: any}): void {

    const dateValue: string | null = answers.date;
    if(!dateValue || dateValue.trim().length < 1) {
      this.formGroup.controls.date.setValue(DateTime.now().toISODate());
    }

    this.formGroup.controls.date.disable();

    this.formGroup.controls.name_people.disable();
    this.formGroup.controls.wwid.disable();

    this.authService.user.pipe(take(1)).subscribe((user) => {
      this.formGroup.controls.name_people.setValue(user?.name ?? '');
      this.formGroup.controls.wwid.setValue(user?.wwid ?? '');
      if(user) {
        this.unitOfWorkDatabase.userRepository.all()
          .pipe(map(users => {
            const userIdx = users.findIndex(value => value.wwid === user.supervisor);
            if (userIdx >= 0) {
              return users[userIdx];
            }
            return null;
          })).subscribe(supervisor =>{
          if(supervisor) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            this.answers.name_manager ? null : this.formGroup.controls.name_manager.setValue(supervisor.name);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            this.answers.phone_manager ? null : this.formGroup.controls.phone_manager.setValue(supervisor.phone);
          }
        });
      }
    });
  }
  submit(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      this.scrollToFirstInvalidControl();
      return;
    }
    this.onSubmit.emit(this.formGroup.value);
  }
}
