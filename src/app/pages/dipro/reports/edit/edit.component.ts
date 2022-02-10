import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, Observable, of, ReplaySubject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsComponent } from '../forms/forms.component';
import { LocalReport } from '../../../../database/models/local_report';
import { UnitOfWorkDatabase } from '../../../../database/unit-of-work.database';
import { catchError, map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: FormsComponent | null = null;

  subTitleTr: string = 'reports.common.names.unknown';

  isLoading = true;
  subscriptionParams: Subscription | null = null;
  pauseSubscription: Subscription | null = null;

  localReport: LocalReport | null = null;

  canBack: ReplaySubject<boolean> | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private unitOfWorkDatabase: UnitOfWorkDatabase,
    private translareService: TranslateService,
    private platform: Platform
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
            map((value) => true),
            catchError((err) => of(true))
          )
          .subscribe((value) => {});
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
}
