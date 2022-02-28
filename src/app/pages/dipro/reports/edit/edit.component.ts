import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, Observable, of, ReplaySubject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsComponent } from '../forms/forms.component';
import { LocalReport } from '../../../../database/models/local_report';
import { UnitOfWorkDatabase } from '../../../../database/unit-of-work.database';
import { catchError, map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BaseDialogComponent } from 'src/app/components/dialogs/base-dialog/base-dialog.component';
import { ReportEndpointService } from 'src/app/services/endpoints/report-endpoint.service';
import { ReportsService } from '../services/reports.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: FormsComponent | null = null;
  @ViewChild('dialogSavedChanges') dialogSavedChanges: BaseDialogComponent | null = null;

  subTitleTr: string = 'reports.common.names.unknown';

  isLoading = true;
  isReviewing: boolean = false;
  subscriptionParams: Subscription | null = null;
  pauseSubscription: Subscription | null = null;

  localReport: LocalReport | null = null;

  canBack: ReplaySubject<boolean> | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private unitOfWorkDatabase: UnitOfWorkDatabase,
    private translareService: TranslateService,
    private reportEndpointService: ReportEndpointService,
    private platform: Platform,
    private location: Location,
    private reportsService: ReportsService,
  ) {}

  ngOnInit(): void {
    this.subscriptionParams = this.activatedRoute.params.subscribe((value) => {
      if (value.id) {
        const id = Number(value.id);
        this.unitOfWorkDatabase.localReportRepository
          .find(id)
          .subscribe((value1) => {
            this.localReport = value1;
            this.canBack = new ReplaySubject<boolean>();
          });
      }
    });

    this.pauseSubscription = this.platform.pause.subscribe((value) => {
      if (this.localReport) {
        this.localReport.answers = this.form?.value ?? {};
        this.unitOfWorkDatabase.localReportRepository
          .update(this.localReport)
          .pipe(
            map(() => true),
            catchError((err) => of(true))
          )
          .subscribe(() => {});
      }
    });
  }

  getSubTitle(): Observable<string> {
    const reportTypeSplit: string[] = this.localReport?.type.split('-') || [];
    for (let i = 1; i < reportTypeSplit.length; i++) {
      reportTypeSplit[i] = `${reportTypeSplit[i - 1]}-${reportTypeSplit[i]}`;
    }

    return combineLatest(reportTypeSplit.map(val => this.translareService.get(`reports.common.names.${val}`)))
    .pipe(map(all => all.join(' / ')));
  }

  ngOnDestroy(): void {
    this.subscriptionParams?.unsubscribe();
    this.pauseSubscription?.unsubscribe();
    this.canBack?.complete();
  }

  saveChanges(): void {
    if (this.localReport) {
      this.localReport.answers = this.form?.value ?? {};
      this.unitOfWorkDatabase.localReportRepository
        .update(this.localReport)
        .pipe(
          map((value) => true),
          catchError((err) => of(true))
        )
        .subscribe((value) => {
          this.canBack?.next(true);
        });
    } else {
      this.canBack?.next(true);
    }
  }

  saveChangesConfirmation(): void {
    if (this.localReport) {
      this.localReport.answers = this.form?.value ?? {};
      this.unitOfWorkDatabase.localReportRepository
        .update(this.localReport)
        .pipe(
          map((value) => true),
          catchError((err) => of(true))
        )
        .subscribe((value) => {
          this.dialogSavedChanges?.open();
        });
    } else {
    }
  }

  submitChanges(): void {
    if (this.localReport) {
      this.localReport.answers = this.form?.value ?? {};
      this.unitOfWorkDatabase.localReportRepository
        .update(this.localReport)
        .pipe(
          map((value) => true),
          catchError((err) => of(true))
        )
        .subscribe((value) => {
          this.isReviewing = true;
        });
    } else {
    }
  }

  submitChangesConfirmation(): void {
    if(this.localReport) {
      let type: any = 'unknown';
        switch (this.localReport.type) {
          case 'jsa-onSite':
            type = 'jsa_sitio';
            break;
          case 'jsa-onField-generic':
            type = 'jsa_field_generic';
            break;
          case 'jsa-onField-powerGeneration':
            type = 'jsa_field_power_gen';
            break;
          case 'jsa-onField-marine':
            type = 'jsa_field_marine';
            break;
          case 'jsa-warehouse':
            type = 'warehouse';
            break;
          case 'service-generic':
            type = 'service_generic';
            break;
          case 'service-preventiveMaintenance':
            type = 'service_maintenance';
            break;
          case 'ingersollRand-rotaryContactCooledRotary':
            type = 'rot_contact_rotary';
            break;
          case 'ingersollRand-rotaryOilFreeSierra':
            type = 'rot_oil_free_sierra';
            break;
          case 'ingersollRand-hlEhHb':
            type = 'hl_eh_hb';
            break;
          case 'ingersollRand-rotaryContactCooledNirvana':
            type = 'rot_contact_nirvana';
            break;
          case 'ingersollRand-rotaryOilFreeNirvana':
            type = 'rot_oil_free_nirvana';
            break;
          case 'ingersollRand-refrigeratedDryerSystem':
            type = 'refrigerated';
            break;
        }
      this.reportEndpointService.save({
        answer: this.localReport.answers ?? {},
        form_name: type,
        locale: 'es'
      })
      .subscribe(response => {
        this.unitOfWorkDatabase.localReportRepository
        .delete(this.localReport?.id ?? 0)
        .pipe(catchError(erro => of(null))).subscribe(x => {
          this.reportsService.reloadAll();
        this.location.back();
        });
      });
    }
  }
}
