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
import { AuthService } from '../../../../../services/auth.service';
import {map, take} from 'rxjs/operators';
import {BaseForm, OnAnswer} from '../base-form';
import { User } from '../../../../../database/models/user';
import {DateTime} from 'luxon';
import {Technician} from '../../../../../database/models/technician';
import {Hardcoded} from '../../hardcoded';

@Component({
  selector: 'app-jsa-on-site',
  templateUrl: './jsa-on-site.component.html',
  styleUrls: ['./jsa-on-site.component.scss'],
})
export class JsaOnSiteComponent extends BaseForm implements OnInit, OnAnswer {
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
      label: 'forms.jsa.site.covidPrevention.title',
      questions: [
        {
          label:
            'forms.jsa.site.covidPrevention.question1',
          formControlName: 'skin_face',
        },
        {
          label:
            'forms.jsa.site.covidPrevention.question2',
          formControlName: 'social',
        },
        {
          label: 'forms.jsa.site.covidPrevention.question3',
          formControlName: 'hand_cleaning',
        },
        {
          label:
            'forms.jsa.site.covidPrevention.question4',
          formControlName: 'social_precaution',
        },
        {
          label: 'forms.jsa.site.covidPrevention.question5',
          formControlName: 'sanitizer',
        },
      ],
    },
    {
      label: 'forms.jsa.site.preparation.title',
      questions: [
        {
          label:
            'forms.jsa.site.preparation.question1',
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
            'forms.jsa.site.preparation.question2',
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
            'forms.jsa.site.preparation.question3',
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
      label: 'forms.jsa.site.toolsAndEquipment.title',
      questions: [
        {
          label:
            'forms.jsa.site.toolsAndEquipment.question1',
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
            'forms.jsa.site.toolsAndEquipment.question2',
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
      label: 'forms.jsa.site.access.title',
      questions: [
        {
          label:
            'forms.jsa.site.access.question1',
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
            'forms.jsa.site.access.question2',
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
          label: 'forms.jsa.site.access.question3',
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
      label: 'forms.jsa.site.checkboxesP1.chbx1',
      formControlName1: 'name1_question',
      formControlName2: 'name2_question',
    },
    {
      formControlName: 'question13_site',
      label: 'forms.jsa.site.checkboxesP1.chbx2',
      formControlName1: 'name3_question',
      formControlName2: 'name4_question',
    },
    {
      formControlName: 'question14_site',
      label: 'forms.jsa.site.checkboxesP1.chbx7',
      formControlName1: 'name5_question',
      formControlName2: 'name6_question',
    },
    {
      formControlName: 'question15_site',
      label: 'forms.jsa.site.checkboxesP1.chbx3',
      formControlName1: 'name7_question',
      formControlName2: 'name8_question',
    },
    {
      formControlName: 'question16_site',
      label: 'forms.jsa.site.checkboxesP1.chbx4',
      formControlName1: 'name9_question',
      formControlName2: 'name10_question',
    },
    {
      formControlName: 'question17_site',
      label: 'forms.jsa.site.checkboxesP1.chbx5',
      formControlName1: 'name11_question',
      formControlName2: 'name12_question',
    },
    {
      formControlName: 'question18_site',
      label: 'forms.jsa.site.checkboxesP1.chbx6',
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
    site2_quest: new FormControl(null, []),
    site3_quest: new FormControl(null, []),
    site4_quest: new FormControl(null, []),
    site5_quest: new FormControl(null, []),
    site6_quest: new FormControl(null, []),
    site7_quest: new FormControl(null, []),
    site8_quest: new FormControl(null, [Validators.required]),
    site9_quest: new FormControl(null, []),
    site10_quest: new FormControl(null, []),
    site11_quest: new FormControl(null, []),
    site12_quest: new FormControl(null, []),
    site13_quest: new FormControl(null, []),
    site14_quest: new FormControl(null, []),
    site15_quest: new FormControl(null, [Validators.required]),
    site16_quest: new FormControl(null, []),
    site17_quest: new FormControl(null, []),
    site18_quest: new FormControl(null, []),
    site19_quest: new FormControl(null, []),
    site20_quest: new FormControl(null, []),
    site21_quest: new FormControl(null, []),
    site22_quest: new FormControl(null, [Validators.required]),
    site23_quest: new FormControl(null, []),
    site24_quest: new FormControl(null, []),
    site25_quest: new FormControl(null, []),
    site26_quest: new FormControl(null, []),
    site27_quest: new FormControl(null, []),
    site28_quest: new FormControl(null, []),
    site29_quest: new FormControl(null, [Validators.required]),
    site30_quest: new FormControl(null, []),
    site31_quest: new FormControl(null, []),
    site32_quest: new FormControl(null, []),
    site33_quest: new FormControl(null, []),
    site34_quest: new FormControl(null, []),
    site35_quest: new FormControl(null, []),
    site36_quest: new FormControl(null, [Validators.required]),
    site37_quest: new FormControl(null, []),
    site38_quest: new FormControl(null, []),
    site39_quest: new FormControl(null, []),
    site40_quest: new FormControl(null, []),
    site41_quest: new FormControl(null, []),
    site42_quest: new FormControl(null, []),
    site43_quest: new FormControl(null, [Validators.required]),
    site44_quest: new FormControl(null, []),
    site45_quest: new FormControl(null, []),
    site46_quest: new FormControl(null, []),
    site47_quest: new FormControl(null, []),
    site48_quest: new FormControl(null, []),
    site49_quest: new FormControl(null, []),
    site50_quest: new FormControl(null, [Validators.required]),
    site51_quest: new FormControl(null, []),
    site52_quest: new FormControl(null, []),
    site53_quest: new FormControl(null, []),
    site54_quest: new FormControl(null, []),
    site55_quest: new FormControl(null, []),
    site56_quest: new FormControl(null, []),
    site57_quest: new FormControl(null, [Validators.required]),
    site58_quest: new FormControl(null, []),
    site59_quest: new FormControl(null, []),
    site60_quest: new FormControl(null, []),
    site61_quest: new FormControl(null, []),
    site62_quest: new FormControl(null, []),
    site63_quest: new FormControl(null, []),
    site64_quest: new FormControl(null, [Validators.required]),
    site65_quest: new FormControl(null, []),
    site66_quest: new FormControl(null, []),
    site67_quest: new FormControl(null, []),
    site68_quest: new FormControl(null, []),
    site69_quest: new FormControl(null, []),
    site70_quest: new FormControl(null, []),
    question11_site: new FormControl(null, [Validators.required]),
    question11_1_site: new FormControl(null, []),
    question12_site: new FormControl(null, []),
    name1_question: new FormControl(null, []),
    name2_question: new FormControl(null, []),
    question13_site: new FormControl(null, []),
    name3_question: new FormControl(null, []),
    name4_question: new FormControl(null, []),
    question14_site: new FormControl(null, []),
    name5_question: new FormControl(null, []),
    name6_question: new FormControl(null, []),
    question15_site: new FormControl(null, []),
    name7_question: new FormControl(null, []),
    name8_question: new FormControl(null, []),
    question16_site: new FormControl(null, []),
    name9_question: new FormControl(null, []),
    name10_question: new FormControl(null, []),
    question17_site: new FormControl(null, []),
    name11_question: new FormControl(null, []),
    name12_question: new FormControl(null, []),
    question18_site: new FormControl(null, []),
    name13_question: new FormControl(null, []),
    name14_question: new FormControl(null, []),
    question19_site: new FormControl(null, []),
    question20_site: new FormControl(null, []),
    question21_site: new FormControl(null, []),
    question22_site: new FormControl(null, []),
    question23_site: new FormControl(null, []),
    question24_site: new FormControl(null, []),
    question25_site: new FormControl(null, []),
    question26_site: new FormControl(null, []),
    question27_site: new FormControl(null, []),
    question28_site: new FormControl(null, []),
    different_unnusual: new FormControl(null),
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
    this.categoriesUnits$ = Hardcoded.categories();
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
