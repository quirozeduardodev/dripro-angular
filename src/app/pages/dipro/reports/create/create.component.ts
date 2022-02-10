import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsComponent, ReportType } from '../forms/forms.component';
import { ReportEndpointService } from '../../../../services/endpoints/report-endpoint.service';
import * as CryptoJS from 'crypto-js';
import { UnitOfWorkDatabase } from '../../../../database/unit-of-work.database';
import { LocalReport } from '../../../../database/models/local_report';
import { delay, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {

  @ViewChild('form') form: FormsComponent | null = null;
  validTypes: ReportType[] = [
    'jsa-onSite',
    'jsa-warehouse',
    'jsa-onField-generic',
    'jsa-onField-powerGeneration',
    'jsa-onField-marine',
    'service-generic',
    'service-preventiveMaintenance',
    'ingersollRand-rotaryContactCooledRotary',
    'ingersollRand-rotaryOilFreeSierra',
    'ingersollRand-hlEhHb',
    'ingersollRand-rotaryOilFreeNirvana',
    'ingersollRand-refrigeratedDryerSystem',
    'ingersollRand-rotaryContactCooledNirvana',
  ];

  localReport: LocalReport | null = null;
  private paramsSubscription: Subscription | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reportEndpointService: ReportEndpointService,
    private unitOfWorkDatabase: UnitOfWorkDatabase
  ) {}

  ngOnInit() {
    const hash = this._generateInternalHashFromTime();
    this.paramsSubscription = this.activatedRoute.params.subscribe((params) => {
      const typeBase64: string | null = params.typeBase64;
      if (typeBase64) {
        try {
          const decodedType: ReportType = atob(typeBase64) as ReportType;
          if (!this.validTypes.includes(decodedType)) {
            throw Error('Invalid type of report');
          }
          this.unitOfWorkDatabase.localReportRepository
            .add({
              id: 0,
              hash,
              answers: {},
              type: decodedType,
            })
            .pipe(delay(500))
            .subscribe((value) => {
              this.router.navigate([`/reports/edit/${value.id}`], {
                replaceUrl: true,
              });
            });
        } catch (e) {
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

  private _generateInternalHashFromTime(): string {
    const nowTime = new Date().getTime();
    const shaResult = CryptoJS.SHA256(`${nowTime}`);
    return shaResult.toString();
  }
}
