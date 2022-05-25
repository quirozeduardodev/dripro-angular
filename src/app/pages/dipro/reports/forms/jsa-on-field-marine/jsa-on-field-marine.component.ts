/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DateTime} from 'luxon';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { Category } from 'src/app/database/models/category';
import { Unit } from 'src/app/database/models/unit';
import { User } from 'src/app/database/models/user';
import { UnitOfWorkDatabase } from 'src/app/database/unit-of-work.database';
import { AuthService } from 'src/app/services/auth.service';
import {BaseForm, OnAnswer} from '../base-form';
import {Technician} from '../../../../../database/models/technician';
import {Hardcoded} from '../../hardcoded';

@Component({
  selector: 'app-jsa-on-field-marine',
  templateUrl: './jsa-on-field-marine.component.html',
  styleUrls: ['./jsa-on-field-marine.component.scss'],
})
export class JsaOnFieldMarineComponent extends BaseForm implements OnInit, OnAnswer {
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
      label: 'forms.jsa.field.marine.covidPrevention.title',
      questions: [
        {
          label:
            'forms.jsa.field.marine.covidPrevention.question1',
          formControlName: 'skin_face',
        },
        {
          label:
            'forms.jsa.field.marine.covidPrevention.question2',
          formControlName: 'social',
        },
        {
          label: 'forms.jsa.field.marine.covidPrevention.question3',
          formControlName: 'hand_cleaning',
        },
        {
          label:
            'forms.jsa.field.marine.covidPrevention.question4',
          formControlName: 'social_precaution',
        },
        {
          label: 'forms.jsa.field.marine.covidPrevention.question5',
          formControlName: 'sanitizer',
        },
      ],
    },
    {
      label: 'forms.jsa.field.marine.preparation.title',
      questions: [
        {
          label:
            'forms.jsa.field.marine.preparation.question1',
          formControlName: 'question1_marine',
          subOptions: {
            fCNRiskLevel: 'question2_marine',
            fCNControlled: 'question3_marine',
            fCNCauseAnalysis: 'question4_marine',
            fCNCauseAnalysisOther: 'question5_marine',
            fCNTaken: 'question6_marine',
            fCNTakenOther: 'question7_marine',
          },
        },
        {
          label:
            'forms.jsa.field.marine.preparation.question2',
          formControlName: 'question8_marine',
          subOptions: {
            fCNRiskLevel: 'question9_marine',
            fCNControlled: 'question10_marine',
            fCNCauseAnalysis: 'question11_marine',
            fCNCauseAnalysisOther: 'question12_marine',
            fCNTaken: 'question13_marine',
            fCNTakenOther: 'question14_marine',
          },
        },
        {
          label:
            'forms.jsa.field.marine.preparation.question3',
          formControlName: 'question15_marine',
          subOptions: {
            fCNRiskLevel: 'question16_marine',
            fCNControlled: 'question17_marine',
            fCNCauseAnalysis: 'question18_marine',
            fCNCauseAnalysisOther: 'question19_marine',
            fCNTaken: 'question20_marine',
            fCNTakenOther: 'question21_marine',
          },
        },
        {
          label:
            'forms.jsa.field.marine.preparation.question4',
          formControlName: 'question22_marine',
          subOptions: {
            fCNRiskLevel: 'question23_marine',
            fCNControlled: 'question24_marine',
            fCNCauseAnalysis: 'question25_marine',
            fCNCauseAnalysisOther: 'question26_marine',
            fCNTaken: 'question27_marine',
            fCNTakenOther: 'question28_marine',
          },
        },
        {
          label:
            'forms.jsa.field.marine.preparation.question5',
          formControlName: 'question29_marine',
          subOptions: {
            fCNRiskLevel: 'question30_marine',
            fCNControlled: 'question31_marine',
            fCNCauseAnalysis: 'question32_marine',
            fCNCauseAnalysisOther: 'question33_marine',
            fCNTaken: 'question34_marine',
            fCNTakenOther: 'question35_marine',
          },
        },
        {
          label:
            'forms.jsa.field.marine.preparation.question6',
          formControlName: 'question36_marine',
          subOptions: {
            fCNRiskLevel: 'question37_marine',
            fCNControlled: 'question38_marine',
            fCNCauseAnalysis: 'question39_marine',
            fCNCauseAnalysisOther: 'question40_marine',
            fCNTaken: 'question41_marine',
            fCNTakenOther: 'question42_marine',
          },
        },
        {
          label:
            'forms.jsa.field.marine.preparation.question7',
          formControlName: 'question43_marine',
          subOptions: {
            fCNRiskLevel: 'question44_marine',
            fCNControlled: 'question45_marine',
            fCNCauseAnalysis: 'question46_marine',
            fCNCauseAnalysisOther: 'question47_marine',
            fCNTaken: 'question48_marine',
            fCNTakenOther: 'question49_marine',
          },
        },
      ],
    },
    {
      label: 'forms.jsa.field.marine.toolsAndEquipment.title',
      questions: [
        {
          label:
            'forms.jsa.field.marine.toolsAndEquipment.question1',
          formControlName: 'question50_marine',
          subOptions: {
            fCNRiskLevel: 'question51_marine',
            fCNControlled: 'question52_marine',
            fCNCauseAnalysis: 'question53_marine',
            fCNCauseAnalysisOther: 'question54_marine',
            fCNTaken: 'question55_marine',
            fCNTakenOther: 'question56_marine',
          },
        },
        {
          label:
            'forms.jsa.field.marine.toolsAndEquipment.question2',
          formControlName: 'question57_marine',
          subOptions: {
            fCNRiskLevel: 'question58_marine',
            fCNControlled: 'question59_marine',
            fCNCauseAnalysis: 'question60_marine',
            fCNCauseAnalysisOther: 'question61_marine',
            fCNTaken: 'question62_marine',
            fCNTakenOther: 'question63_marine',
          },
        },
        {
          label:
            'forms.jsa.field.marine.toolsAndEquipment.question3',
          formControlName: 'question64_marine',
          subOptions: {
            fCNRiskLevel: 'question65_marine',
            fCNControlled: 'question66_marine',
            fCNCauseAnalysis: 'question67_marine',
            fCNCauseAnalysisOther: 'question68_marine',
            fCNTaken: 'question69_marine',
            fCNTakenOther: 'question70_marine',
          },
        },
        {
          label:
            'forms.jsa.field.marine.toolsAndEquipment.question4',
          formControlName: 'question71_marine',
          subOptions: {
            fCNRiskLevel: 'question72_marine',
            fCNControlled: 'question73_marine',
            fCNCauseAnalysis: 'question74_marine',
            fCNCauseAnalysisOther: 'question75_marine',
            fCNTaken: 'question76_marine',
            fCNTakenOther: 'question77_marine',
          },
        },
      ],
    },
    {
      label: 'forms.jsa.field.marine.access.title',
      questions: [
        {
          label:
            'forms.jsa.field.marine.access.question1',
          formControlName: 'question78_marine',
          subOptions: {
            fCNRiskLevel: 'question79_marine',
            fCNControlled: 'question80_marine',
            fCNCauseAnalysis: 'question81_marine',
            fCNCauseAnalysisOther: 'question82_marine',
            fCNTaken: 'question83_marine',
            fCNTakenOther: 'question84_marine',
          },
        },
        {
          label:
            'forms.jsa.field.marine.access.question2',
          formControlName: 'question85_marine',
          subOptions: {
            fCNRiskLevel: 'question86_marine',
            fCNControlled: 'question87_marine',
            fCNCauseAnalysis: 'question88_marine',
            fCNCauseAnalysisOther: 'question89_marine',
            fCNTaken: 'question90_marine',
            fCNTakenOther: 'question91_marine',
          },
        },
        {
          label: 'forms.jsa.field.marine.access.question3',
          formControlName: 'question92_marine',
          subOptions: {
            fCNRiskLevel: 'question93_marine',
            fCNControlled: 'question94_marine',
            fCNCauseAnalysis: 'question95_marine',
            fCNCauseAnalysisOther: 'question96_marine',
            fCNTaken: 'question97_marine',
            fCNTakenOther: 'question98_marine',
          },
        },
        {
          label: 'forms.jsa.field.marine.access.question4',
          formControlName: 'question99_marine',
          subOptions: {
            fCNRiskLevel: 'question100_marine',
            fCNControlled: 'question101_marine',
            fCNCauseAnalysis: 'question102_marine',
            fCNCauseAnalysisOther: 'question103_marine',
            fCNTaken: 'question104_marine',
            fCNTakenOther: 'question105_marine',
          },
        },
        {
          label: 'forms.jsa.field.marine.access.question5',
          formControlName: 'question106_marine',
          subOptions: {
            fCNRiskLevel: 'question107_marine',
            fCNControlled: 'question108_marine',
            fCNCauseAnalysis: 'question109_marine',
            fCNCauseAnalysisOther: 'question110_marine',
            fCNTaken: 'question111_marine',
            fCNTakenOther: 'question112_marine',
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
      formControlName: 'question128_marine',
      label: 'forms.jsa.field.marine.checkboxesP1.chbx1',
      formControlName1: 'name1_question',
      formControlName2: 'name2_question',
    },
    {
      formControlName: 'question129_marine',
      label: 'forms.jsa.field.marine.checkboxesP1.chbx2',
      formControlName1: 'name3_question',
      formControlName2: 'name4_question',
    },
    {
      formControlName: 'question130_marine',
      label: 'forms.jsa.field.marine.checkboxesP1.chbx7',
      formControlName1: 'name5_question',
      formControlName2: 'name6_question',
    },
    {
      formControlName: 'question131_marine',
      label: 'forms.jsa.field.marine.checkboxesP1.chbx3',
      formControlName1: 'name7_question',
      formControlName2: 'name8_question',
    },
    {
      formControlName: 'question132_marine',
      label: 'forms.jsa.field.marine.checkboxesP1.chbx4',
      formControlName1: 'name9_question',
      formControlName2: 'name10_question',
    },
    {
      formControlName: 'question133_marine',
      label: 'forms.jsa.field.marine.checkboxesP1.chbx5',
      formControlName1: 'name11_question',
      formControlName2: 'name12_question',
    },
    {
      formControlName: 'question134_marine',
      label: 'forms.jsa.field.marine.checkboxesP1.chbx6',
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
    task_category_marine: new FormControl(null, [Validators.required]),
    task_description: new FormControl(null, [Validators.required]),
    location: new FormControl(null, [Validators.required]),
    skin_face: new FormControl(null, [Validators.required]),
    social: new FormControl(null, [Validators.required]),
    hand_cleaning: new FormControl(null, [Validators.required]),
    social_precaution: new FormControl(null, [Validators.required]),
    sanitizer: new FormControl(null, [Validators.required]),

    question1_marine: new FormControl(null, [Validators.required]),
    question2_marine: new FormControl(null, []),
    question3_marine: new FormControl(null, []),
    question4_marine: new FormControl(null, []),
    question5_marine: new FormControl(null, []),
    question6_marine: new FormControl(null, []),
    question7_marine: new FormControl(null, []),
    question8_marine: new FormControl(null, [Validators.required]),
    question9_marine: new FormControl(null, []),
    question10_marine: new FormControl(null, []),
    question11_marine: new FormControl(null, []),
    question12_marine: new FormControl(null, []),
    question13_marine: new FormControl(null, []),
    question14_marinee: new FormControl(null, []),
    question15_marine: new FormControl(null, [Validators.required]),
    question16_marine: new FormControl(null, []),
    question17_marine: new FormControl(null, []),
    question18_marine: new FormControl(null, []),
    question19_marine: new FormControl(null, []),
    question20_marine: new FormControl(null, []),
    question21_marine: new FormControl(null, []),
    question22_marine: new FormControl(null, [Validators.required]),
    question23_marine: new FormControl(null, []),
    question24_marine: new FormControl(null, []),
    question25_marine: new FormControl(null, []),
    question26_marine: new FormControl(null, []),
    question27_marine: new FormControl(null, []),
    question28_marine: new FormControl(null, []),
    question29_marine: new FormControl(null, [Validators.required]),
    question30_marine: new FormControl(null, []),
    question31_marine: new FormControl(null, []),
    question32_marine: new FormControl(null, []),
    question33_marine: new FormControl(null, []),
    question34_marine: new FormControl(null, []),
    question35_marine: new FormControl(null, []),
    question36_marine: new FormControl(null, [Validators.required]),
    question37_marine: new FormControl(null, []),
    question38_marine: new FormControl(null, []),
    question39_marine: new FormControl(null, []),
    question40_marine: new FormControl(null, []),
    question41_marine: new FormControl(null, []),
    question42_marine: new FormControl(null, []),
    question43_marine: new FormControl(null, [Validators.required]),
    question44_marine: new FormControl(null, []),
    question45_marine: new FormControl(null, []),
    question46_marine: new FormControl(null, []),
    question47_marine: new FormControl(null, []),
    question48_marine: new FormControl(null, []),
    question49_marine: new FormControl(null, []),
    question50_marine: new FormControl(null, [Validators.required]),
    question51_marine: new FormControl(null, []),
    question52_marine: new FormControl(null, []),
    question53_marine: new FormControl(null, []),
    question54_marine: new FormControl(null, []),
    question55_marine: new FormControl(null, []),
    question56_marine: new FormControl(null, []),
    question57_marine: new FormControl(null, [Validators.required]),
    question58_marine: new FormControl(null, []),
    question59_marine: new FormControl(null, []),
    question60_marine: new FormControl(null, []),
    question61_marine: new FormControl(null, []),
    question62_marine: new FormControl(null, []),
    question63_marine: new FormControl(null, []),
    question64_marine: new FormControl(null, [Validators.required]),
    question65_marine: new FormControl(null, []),
    question66_marine: new FormControl(null, []),
    question67_marine: new FormControl(null, []),
    question68_marine: new FormControl(null, []),
    question69_marine: new FormControl(null, []),
    question70_marine: new FormControl(null, []),
    question71_marine: new FormControl(null, [Validators.required]),
    question72_marine: new FormControl(null, []),
    question73_marine: new FormControl(null, []),
    question74_marine: new FormControl(null, []),
    question75_marine: new FormControl(null, []),
    question76_marine: new FormControl(null, []),
    question77_marine: new FormControl(null, []),
    question78_marine: new FormControl(null, [Validators.required]),
    question79_marine: new FormControl(null, []),
    question80_marine: new FormControl(null, []),
    question81_marine: new FormControl(null, []),
    question82_marine: new FormControl(null, []),
    question83_marine: new FormControl(null, []),
    question84_marine: new FormControl(null, []),
    question85_marine: new FormControl(null, [Validators.required]),
    question86_marine: new FormControl(null, []),
    question87_marine: new FormControl(null, []),
    question88_marine: new FormControl(null, []),
    question89_marine: new FormControl(null, []),
    question90_marine: new FormControl(null, []),
    question91_marine: new FormControl(null, []),
    question92_marine: new FormControl(null, [Validators.required]),
    question93_marine: new FormControl(null, []),
    question94_marine: new FormControl(null, []),
    question95_marine: new FormControl(null, []),
    question96_marine: new FormControl(null, []),
    question97_marine: new FormControl(null, []),
    question98_marine: new FormControl(null, []),
    question99_marine: new FormControl(null, [Validators.required]),
    question100_marine: new FormControl(null, []),
    question101_marine: new FormControl(null, []),
    question102_marine: new FormControl(null, []),
    question103_marine: new FormControl(null, []),
    question104_marine: new FormControl(null, []),
    question105_marine: new FormControl(null, []),
    question106_marine: new FormControl(null, [Validators.required]),
    question107_marine: new FormControl(null, []),
    question108_marine: new FormControl(null, []),
    question109_marine: new FormControl(null, []),
    question110_marine: new FormControl(null, []),
    question111_marine: new FormControl(null, []),
    question112_marine: new FormControl(null, []),
    question113_marine: new FormControl(null, [Validators.required]),
    question114_marine: new FormControl(null, []),
    question115_marine: new FormControl(null, []),
    question116_marine: new FormControl(null, []),
    question117_marine: new FormControl(null, []),
    question118_marine: new FormControl(null, []),
    question119_marine: new FormControl(null, []),
    question120_marine: new FormControl(null, [Validators.required]),
    question121_marine: new FormControl(null, []),
    question122_marine: new FormControl(null, []),
    question123_marine: new FormControl(null, []),
    question124_marine: new FormControl(null, []),
    question125_marine: new FormControl(null, []),
    question126_marine: new FormControl(null, []),
    question127_marine: new FormControl(null, [Validators.required]),
    question127_1_marine: new FormControl(null, []),
    question128_marine: new FormControl(null, []),
    name1_question: new FormControl(null, []),
    name2_question: new FormControl(null, []),
    question129_marine: new FormControl(null, []),
    name3_question: new FormControl(null, []),
    name4_question: new FormControl(null, []),
    question130_marine: new FormControl(null, []),
    name5_question: new FormControl(null, []),
    name6_question: new FormControl(null, []),
    question131_marine: new FormControl(null, []),
    name7_question: new FormControl(null, []),
    name8_question: new FormControl(null, []),
    question132_marine: new FormControl(null, []),
    name9_question: new FormControl(null, []),
    name10_question: new FormControl(null, []),
    question133_marine: new FormControl(null, []),
    name11_question: new FormControl(null, []),
    name12_question: new FormControl(null, []),
    question134_marine: new FormControl(null, []),
    name13_question: new FormControl(null, []),
    name14_question: new FormControl(null, []),
    question135_marine: new FormControl(null, []),
    question136_marine: new FormControl(null, []),
    question137_marine: new FormControl(null, []),
    question138_marine: new FormControl(null, []),
    question139_marine: new FormControl(null, []),
    question140_marine: new FormControl(null, []),
    question141_marine: new FormControl(null, []),
    question142_marine: new FormControl(null, []),
    question143_marine: new FormControl(null, []),
    question144_marine: new FormControl(null, []),

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
    this.categoriesUnits$ = Hardcoded.jsaCategoriesFieldMarine();
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
