/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { UnitOfWorkDatabase } from '../../../../../database/unit-of-work.database';
import { Unit } from '../../../../../database/models/unit';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../../database/models/category';
import * as moment from 'moment-timezone';
import { AuthService } from '../../../../../services/auth.service';
import { take } from 'rxjs/operators';
import { BaseForm } from '../base-form';
import { User } from '../../../../../database/models/user';

@Component({
  selector: 'app-jsa-on-site',
  templateUrl: './jsa-on-site.component.html',
  styleUrls: ['./jsa-on-site.component.scss'],
})
export class JsaOnSiteComponent extends BaseForm implements OnInit {
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
      label: 'forms.jsa.warehouse.covidPrevention.title',
      questions: [
        {
          label:
            'forms.jsa.warehouse.covidPrevention.question1',
          formControlName: 'skin_face',
        },
        {
          label:
            'forms.jsa.warehouse.covidPrevention.question2',
          formControlName: 'social',
        },
        {
          label: 'forms.jsa.warehouse.covidPrevention.question3',
          formControlName: 'hand_cleaning',
        },
        {
          label:
            'forms.jsa.warehouse.covidPrevention.question4',
          formControlName: 'social_precaution',
        },
        {
          label: 'forms.jsa.warehouse.covidPrevention.question5',
          formControlName: 'sanitizer',
        },
      ],
    },
    {
      label: 'forms.jsa.warehouse.preparation.title',
      questions: [
        {
          label:
            'forms.jsa.warehouse.preparation.question1',
          formControlName: 'site1_quest',
          subOptions: {
            fCNRiskLevel: 'site2_quest',
            fCNControlled: 'site3_quest',
            fCNCauseAnalysis: 'site4_quest',
            fCNCauseAnalysisOther: 'site5_quest',
            fCNTaken: 'site6_quest',
            fCNTakenOther: 'site7_quest',
          },
        },
        {
          label:
            'forms.jsa.warehouse.preparation.question2',
          formControlName: 'site8_quest',
          subOptions: {
            fCNRiskLevel: 'site9_quest',
            fCNControlled: 'site10_quest',
            fCNCauseAnalysis: 'site11_quest',
            fCNCauseAnalysisOther: 'site12_quest',
            fCNTaken: 'site13_quest',
            fCNTakenOther: 'site14_quest',
          },
        },
        {
          label:
            'forms.jsa.warehouse.preparation.question3',
          formControlName: 'site15_quest',
          subOptions: {
            fCNRiskLevel: 'site16_quest',
            fCNControlled: 'site17_quest',
            fCNCauseAnalysis: 'site18_quest',
            fCNCauseAnalysisOther: 'site19_quest',
            fCNTaken: 'site20_quest',
            fCNTakenOther: 'site21_quest',
          },
        },
      ],
    },
    {
      label: 'forms.jsa.warehouse.toolsAndEquipment.title',
      questions: [
        {
          label:
            'forms.jsa.warehouse.toolsAndEquipment.question1',
          formControlName: 'site22_quest',
          subOptions: {
            fCNRiskLevel: 'site23_quest',
            fCNControlled: 'site24_quest',
            fCNCauseAnalysis: 'site25_quest',
            fCNCauseAnalysisOther: 'site26_quest',
            fCNTaken: 'site27_quest',
            fCNTakenOther: 'site28_quest',
          },
        },
        {
          label:
            'forms.jsa.warehouse.toolsAndEquipment.question2',
          formControlName: 'site29_quest',
          subOptions: {
            fCNRiskLevel: 'site30_quest',
            fCNControlled: 'site31_quest',
            fCNCauseAnalysis: 'site32_quest',
            fCNCauseAnalysisOther: 'site33_quest',
            fCNTaken: 'site34_quest',
            fCNTakenOther: 'site35_quest',
          },
        },
      ],
    },
    {
      label: 'forms.jsa.warehouse.access.title',
      questions: [
        {
          label:
            'forms.jsa.warehouse.access.question1',
          formControlName: 'site36_quest',
          subOptions: {
            fCNRiskLevel: 'site37_quest',
            fCNControlled: 'site38_quest',
            fCNCauseAnalysis: 'site39_quest',
            fCNCauseAnalysisOther: 'site40_quest',
            fCNTaken: 'site41_quest',
            fCNTakenOther: 'site42_quest',
          },
        },
        {
          label:
            'forms.jsa.warehouse.access.question2',
          formControlName: 'site43_quest',
          subOptions: {
            fCNRiskLevel: 'site44_quest',
            fCNControlled: 'site45_quest',
            fCNCauseAnalysis: 'site46_quest',
            fCNCauseAnalysisOther: 'site47_quest',
            fCNTaken: 'site48_quest',
            fCNTakenOther: 'site49_quest',
          },
        },
        {
          label: 'forms.jsa.warehouse.access.question3',
          formControlName: 'site50_quest',
          subOptions: {
            fCNRiskLevel: 'site51_quest',
            fCNControlled: 'site52_quest',
            fCNCauseAnalysis: 'site53_quest',
            fCNCauseAnalysisOther: 'site54_quest',
            fCNTaken: 'site55_quest',
            fCNTakenOther: 'site56_quest',
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
      formControlName: 'question12_site',
      label: 'forms.jsa.warehouse.checkboxesP1.chbx1',
      formControlName1: 'name1_question',
      formControlName2: 'name2_question',
    },
    {
      formControlName: 'question13_site',
      label: 'forms.jsa.warehouse.checkboxesP1.chbx2',
      formControlName1: 'name3_question',
      formControlName2: 'name4_question',
    },
    {
      formControlName: 'question14_site',
      label: 'forms.jsa.warehouse.checkboxesP1.chbx7',
      formControlName1: 'name5_question',
      formControlName2: 'name6_question',
    },
    {
      formControlName: 'question15_site',
      label: 'forms.jsa.warehouse.checkboxesP1.chbx3',
      formControlName1: 'name7_question',
      formControlName2: 'name8_question',
    },
    {
      formControlName: 'question16_site',
      label: 'forms.jsa.warehouse.checkboxesP1.chbx4',
      formControlName1: 'name9_question',
      formControlName2: 'name10_question',
    },
    {
      formControlName: 'question17_site',
      label: 'forms.jsa.warehouse.checkboxesP1.chbx5',
      formControlName1: 'name11_question',
      formControlName2: 'name12_question',
    },
    {
      formControlName: 'question18_site',
      label: 'forms.jsa.warehouse.checkboxesP1.chbx6',
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
    task_category_sitio: new FormControl(null, [Validators.required]),
    task_description: new FormControl(null, [Validators.required]),
    location: new FormControl(null, [Validators.required]),
    skin_face: new FormControl(null, [Validators.required]),
    social: new FormControl(null, [Validators.required]),
    hand_cleaning: new FormControl(null, [Validators.required]),
    social_precaution: new FormControl(null, [Validators.required]),
    sanitizer: new FormControl(null, [Validators.required]),
    site1_quest: new FormControl(null, [Validators.required]),
    site2_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site3_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site4_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site5_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site6_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site7_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site8_quest: new FormControl(null, [Validators.required]),
    site9_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site10_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site11_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site12_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site13_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site14_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site15_quest: new FormControl(null, [Validators.required]),
    site16_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site17_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site18_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site19_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site20_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site21_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site22_quest: new FormControl(null, [Validators.required]),
    site23_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site24_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site25_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site26_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site27_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site28_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site29_quest: new FormControl(null, [Validators.required]),
    site30_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site31_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site32_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site33_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site34_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site35_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site36_quest: new FormControl(null, [Validators.required]),
    site37_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site38_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site39_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site40_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site41_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site42_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site43_quest: new FormControl(null, [Validators.required]),
    site44_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site45_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site46_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site47_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site48_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site49_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site50_quest: new FormControl(null, [Validators.required]),
    site51_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site52_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site53_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site54_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site55_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site56_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site57_quest: new FormControl(null, [Validators.required]),
    site58_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site59_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site60_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site61_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site62_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site63_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site64_quest: new FormControl(null, [Validators.required]),
    site65_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site66_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site67_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site68_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site69_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    site70_quest: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question11_site: new FormControl(null, [Validators.required]),
    question11_1_site: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question12_site: new FormControl(false),
    name1_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name2_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question13_site: new FormControl(false),
    name3_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name4_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question14_site: new FormControl(false),
    name5_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name6_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question15_site: new FormControl(false),
    name7_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name8_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question16_site: new FormControl(false),
    name9_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name10_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question17_site: new FormControl(false),
    name11_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name12_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question18_site: new FormControl(false),
    name13_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    name14_question: new FormControl(null), /// This Validators changes if the prev formControl has a specific value
    question19_site: new FormControl([]),
    question20_site: new FormControl([]),
    question21_site: new FormControl([]),
    question22_site: new FormControl([]),
    question23_site: new FormControl([]),
    question24_site: new FormControl([]),
    question25_site: new FormControl([]),
    question26_site: new FormControl([]),
    question27_site: new FormControl([]),
    question28_site: new FormControl([]),
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
