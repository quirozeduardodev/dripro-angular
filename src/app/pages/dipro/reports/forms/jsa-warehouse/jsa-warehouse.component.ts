/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import {BaseForm, OnAnswer} from '../base-form';
import { Observable } from 'rxjs';
import { Unit } from '../../../../../database/models/unit';
import { Category } from '../../../../../database/models/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitOfWorkDatabase } from '../../../../../database/unit-of-work.database';
import { AuthService } from '../../../../../services/auth.service';
import {DateTime} from 'luxon';
import {map, take} from 'rxjs/operators';
import { User } from 'src/app/database/models/user';
import {Technician} from '../../../../../database/models/technician';

@Component({
  selector: 'app-jsa-warehouse',
  templateUrl: './jsa-warehouse.component.html',
  styleUrls: ['./jsa-warehouse.component.scss'],
})
export class JsaWarehouseComponent extends BaseForm implements OnInit, OnAnswer {
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
          label: 'forms.jsa.warehouse.covidPrevention.question1',
          formControlName: 'skin_face',
        },
        {
          label: 'forms.jsa.warehouse.covidPrevention.question2',
          formControlName: 'social',
        },
        {
          label: 'forms.jsa.warehouse.covidPrevention.question3',
          formControlName: 'hand_cleaning',
        },
        {
          label: 'forms.jsa.warehouse.covidPrevention.question4',
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
          formControlName: 'warehouse1_quest',
          subOptions: {
            fCNRiskLevel: 'warehouse2_quest',
            fCNControlled: 'warehouse3_quest',
            fCNCauseAnalysis: 'warehouse4_quest',
            fCNCauseAnalysisOther: 'warehouse5_quest',
            fCNTaken: 'warehouse6_quest',
            fCNTakenOther: 'warehouse7_quest',
          },
        },
        {
          label:
            'forms.jsa.warehouse.preparation.question2',
          formControlName: 'warehouse8_quest',
          subOptions: {
            fCNRiskLevel: 'warehouse9_quest',
            fCNControlled: 'warehouse10_quest',
            fCNCauseAnalysis: 'warehouse11_quest',
            fCNCauseAnalysisOther: 'warehouse12_quest',
            fCNTaken: 'warehouse13_quest',
            fCNTakenOther: 'warehouse14_quest',
          },
        },
        {
          label:
            'forms.jsa.warehouse.preparation.question3',
          formControlName: 'warehouse15_quest',
          subOptions: {
            fCNRiskLevel: 'warehouse16_quest',
            fCNControlled: 'warehouse17_quest',
            fCNCauseAnalysis: 'warehouse18_quest',
            fCNCauseAnalysisOther: 'warehouse19_quest',
            fCNTaken: 'warehouse20_quest',
            fCNTakenOther: 'warehouse21_quest',
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
          formControlName: 'warehouse22_quest',
          subOptions: {
            fCNRiskLevel: 'warehouse23_quest',
            fCNControlled: 'warehouse24_quest',
            fCNCauseAnalysis: 'warehouse25_quest',
            fCNCauseAnalysisOther: 'warehouse26_quest',
            fCNTaken: 'warehouse27_quest',
            fCNTakenOther: 'warehouse28_quest',
          },
        },
        {
          label:
            'forms.jsa.warehouse.toolsAndEquipment.question2',
          formControlName: 'warehouse29_quest',
          subOptions: {
            fCNRiskLevel: 'warehouse30_quest',
            fCNControlled: 'warehouse31_quest',
            fCNCauseAnalysis: 'warehouse32_quest',
            fCNCauseAnalysisOther: 'warehouse33_quest',
            fCNTaken: 'warehouse34_quest',
            fCNTakenOther: 'warehouse35_quest',
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
          formControlName: 'warehouse36_quest',
          subOptions: {
            fCNRiskLevel: 'warehouse37_quest',
            fCNControlled: 'warehouse38_quest',
            fCNCauseAnalysis: 'warehouse39_quest',
            fCNCauseAnalysisOther: 'warehouse40_quest',
            fCNTaken: 'warehouse41_quest',
            fCNTakenOther: 'warehouse42_quest',
          },
        },
        {
          label:
            'forms.jsa.warehouse.access.question2',
          formControlName: 'warehouse43_quest',
          subOptions: {
            fCNRiskLevel: 'warehouse44_quest',
            fCNControlled: 'warehouse45_quest',
            fCNCauseAnalysis: 'warehouse46_quest',
            fCNCauseAnalysisOther: 'warehouse47_quest',
            fCNTaken: 'warehouse48_quest',
            fCNTakenOther: 'warehouse49_quest',
          },
        },
        {
          label: 'forms.jsa.warehouse.access.question3',
          formControlName: 'warehouse50_quest',
          subOptions: {
            fCNRiskLevel: 'warehouse51_quest',
            fCNControlled: 'warehouse52_quest',
            fCNCauseAnalysis: 'warehouse53_quest',
            fCNCauseAnalysisOther: 'warehouse54_quest',
            fCNTaken: 'warehouse55_quest',
            fCNTakenOther: 'warehouse56_quest',
          },
        },
      ],
    },
    {
      label: 'forms.jsa.warehouse.epp.title',
      questions: [
        {
          label: 'forms.jsa.warehouse.epp.question1',
          formControlName: 'warehouse57_quest',
          subOptions: {
            fCNRiskLevel: 'warehouse58_quest',
            fCNControlled: 'warehouse59_quest',
            fCNCauseAnalysis: 'warehouse60_quest',
            fCNCauseAnalysisOther: 'warehouse61_quest',
            fCNTaken: 'warehouse62_quest',
            fCNTakenOther: 'warehouse63_quest',
          },
        },
        {
          label: 'forms.jsa.warehouse.epp.question2',
          formControlName: 'warehouse64_quest',
          subOptions: {
            fCNRiskLevel: 'warehouse65_quest',
            fCNControlled: 'warehouse66_quest',
            fCNCauseAnalysis: 'warehouse67_quest',
            fCNCauseAnalysisOther: 'warehouse68_quest',
            fCNTaken: 'warehouse69_quest',
            fCNTakenOther: 'warehouse70_quest',
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
      formControlName: 'warehouse72_quest',
      label: 'forms.jsa.warehouse.checkboxesP1.chbx1',
      formControlName1: 'name1_question',
      formControlName2: 'name2_question',
    },
    {
      formControlName: 'warehouse73_quest',
      label: 'forms.jsa.warehouse.checkboxesP1.chbx2',
      formControlName1: 'name5_question',
      formControlName2: 'name6_question',
    },
    {
      formControlName: 'warehouse74_quest',
      label: 'forms.jsa.warehouse.checkboxesP1.chbx3',
      formControlName1: 'name7_question',
      formControlName2: 'name8_question',
    },
    {
      formControlName: 'warehouse75_quest',
      label: 'forms.jsa.warehouse.checkboxesP1.chbx4',
      formControlName1: 'name9_question',
      formControlName2: 'name10_question',
    },
    {
      formControlName: 'warehouse76_quest',
      label: 'forms.jsa.warehouse.checkboxesP1.chbx5',
      formControlName1: 'name11_question',
      formControlName2: 'name12_question',
    },
    {
      formControlName: 'warehouse77_quest',
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
    { label: 'forms.jsa.common.causeAnalysis.environment', value: 1 },
    { label: 'forms.jsa.common.causeAnalysis.design', value: 2 },
    { label: 'forms.jsa.common.causeAnalysis.training', value: 3 },
    { label: 'forms.jsa.common.causeAnalysis.equipment', value: 4 },
    { label: 'forms.jsa.common.causeAnalysis.tools', value: 5 },
    { label: 'forms.jsa.common.causeAnalysis.maintenance', value: 6 },
    { label: 'forms.jsa.common.causeAnalysis.proccess', value: 7 },
    { label: 'forms.jsa.common.causeAnalysis.irregular', value: 8 },
    { label: 'forms.jsa.common.causeAnalysis.other', value: 9 },
  ];
  nopOptinsTaken: { label: string; value: any }[] = [
    { label: 'forms.jsa.common.optionsTaken.secured', value: 1 },
    { label: 'forms.jsa.common.optionsTaken.blocked', value: 2 },
    { label: 'forms.jsa.common.optionsTaken.trainedEmploye', value: 3 },
    { label: 'forms.jsa.common.optionsTaken.trained', value: 4 },
    { label: 'forms.jsa.common.optionsTaken.protected', value: 5 },
    { label: 'forms.jsa.common.optionsTaken.epp', value: 6 },
    { label: 'forms.jsa.common.optionsTaken.replaced', value: 7 },
    { label: 'forms.jsa.common.optionsTaken.removed', value: 8 },
    { label: 'forms.jsa.common.optionsTaken.repaired', value: 9 },
    { label: 'forms.jsa.common.optionsTaken.other', value: 10 },
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
    task_category_warehouse: new FormControl(null, [Validators.required]),
    task_description: new FormControl(null, [Validators.required]),
    location: new FormControl(null, [Validators.required]),
    skin_face: new FormControl(null, [Validators.required]),
    social: new FormControl(null, [Validators.required]),
    hand_cleaning: new FormControl(null, [Validators.required]),
    social_precaution: new FormControl(null, [Validators.required]),
    sanitizer: new FormControl(null, [Validators.required]),

    warehouse1_quest: new FormControl(null, []),
    warehouse2_quest: new FormControl(null, []),
    warehouse3_quest: new FormControl(null, []),
    warehouse4_quest: new FormControl(null, []),
    warehouse5_quest: new FormControl(null, []),
    warehouse6_quest: new FormControl(null, []),
    warehouse7_quest: new FormControl(null, []),
    warehouse8_quest: new FormControl(null, []),
    warehouse9_quest: new FormControl(null, []),
    warehouse10_quest: new FormControl(null, []),
    warehouse11_quest: new FormControl(null, []),
    warehouse12_quest: new FormControl(null, []),
    warehouse13_quest: new FormControl(null, []),
    warehouse14_quest: new FormControl(null, []),
    warehouse15_quest: new FormControl(null, []),
    warehouse16_quest: new FormControl(null, []),
    warehouse17_quest: new FormControl(null, []),
    warehouse18_quest: new FormControl(null, []),
    warehouse19_quest: new FormControl(null, []),
    warehouse20_quest: new FormControl(null, []),
    warehouse21_quest: new FormControl(null, []),
    warehouse22_quest: new FormControl(null, []),
    warehouse23_quest: new FormControl(null, []),
    warehouse24_quest: new FormControl(null, []),
    warehouse25_quest: new FormControl(null, []),
    warehouse26_quest: new FormControl(null, []),
    warehouse27_quest: new FormControl(null, []),
    warehouse28_quest: new FormControl(null, []),
    warehouse29_quest: new FormControl(null, []),
    warehouse30_quest: new FormControl(null, []),
    warehouse31_quest: new FormControl(null, []),
    warehouse32_quest: new FormControl(null, []),
    warehouse33_quest: new FormControl(null, []),
    warehouse34_quest: new FormControl(null, []),
    warehouse35_quest: new FormControl(null, []),
    warehouse36_quest: new FormControl(null, []),
    warehouse37_quest: new FormControl(null, []),
    warehouse38_quest: new FormControl(null, []),
    warehouse39_quest: new FormControl(null, []),
    warehouse40_quest: new FormControl(null, []),
    warehouse41_quest: new FormControl(null, []),
    warehouse42_quest: new FormControl(null, []),
    warehouse43_quest: new FormControl(null, []),
    warehouse44_quest: new FormControl(null, []),
    warehouse45_quest: new FormControl(null, []),
    warehouse46_quest: new FormControl(null, []),
    warehouse47_quest: new FormControl(null, []),
    warehouse48_quest: new FormControl(null, []),
    warehouse49_quest: new FormControl(null, []),
    warehouse50_quest: new FormControl(null, []),
    warehouse51_quest: new FormControl(null, []),
    warehouse52_quest: new FormControl(null, []),
    warehouse53_quest: new FormControl(null, []),
    warehouse54_quest: new FormControl(null, []),
    warehouse55_quest: new FormControl(null, []),
    warehouse56_quest: new FormControl(null, []),
    warehouse57_quest: new FormControl(null, []),
    warehouse58_quest: new FormControl(null, []),
    warehouse59_quest: new FormControl(null, []),
    warehouse60_quest: new FormControl(null, []),
    warehouse61_quest: new FormControl(null, []),
    warehouse62_quest: new FormControl(null, []),
    warehouse63_quest: new FormControl(null, []),
    warehouse64_quest: new FormControl(null, []),
    warehouse65_quest: new FormControl(null, []),
    warehouse66_quest: new FormControl(null, []),
    warehouse67_quest: new FormControl(null, []),
    warehouse68_quest: new FormControl(null, []),
    warehouse69_quest: new FormControl(null, []),
    warehouse70_quest: new FormControl(null, []),
    warehouse71_quest: new FormControl(null, []),
    warehouse71_1_quest: new FormControl(null, []),
    warehouse72_quest: new FormControl(null, []),
    name1_question: new FormControl(null, []),
    name2_question: new FormControl(null, []),
    warehouse73_quest: new FormControl(null, []),
    name5_question: new FormControl(null, []),
    name6_question: new FormControl(null, []),
    warehouse74_quest: new FormControl(null, []),
    name7_question: new FormControl(null, []),
    name8_question: new FormControl(null, []),
    warehouse75_quest: new FormControl(null, []),
    name9_question: new FormControl(null, []),
    name10_question: new FormControl(null, []),
    warehouse76_quest: new FormControl(null, []),
    name11_question: new FormControl(null, []),
    name12_question: new FormControl(null, []),
    warehouse77_quest: new FormControl(null, []),
    name13_question: new FormControl(null, []),
    name14_question: new FormControl(null, []),
    warehouse78_quest: new FormControl(null, []),
    warehouse79_quest: new FormControl(null, []),
    warehouse80_quest: new FormControl(null, []),
    warehouse81_quest: new FormControl(null, []),
    warehouse82_quest: new FormControl(null, []),
    warehouse83_quest: new FormControl(null, []),
    warehouse84_quest: new FormControl(null, []),
    warehouse85_quest: new FormControl(null, []),
    warehouse86_quest: new FormControl(null, []),

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
