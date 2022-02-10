import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportEndpointService } from '../../../../services/endpoints/report-endpoint.service';
import { combineLatest, Observable, Subscription, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsComponent, ReportType } from '../forms/forms.component';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  @ViewChild('form') form: FormsComponent | null = null;
  isLoading = true;
  subscriptionParams: Subscription | null = null;
  reportType: ReportType | null = null;
  answers: { [p: string]: any } = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private translareService: TranslateService,
    private reportEndpointService: ReportEndpointService
  ) {}

  ngOnInit() {
    this.subscriptionParams = this.activatedRoute.params.subscribe((value) => {
      if (value.id) {
        const id = Number(value.id);
        this.reportEndpointService
          .findAnswers(id)
          .pipe(
            map((report) => {
              const result: {
                type: ReportType | null;
                answers: { [p: string]: any };
              } = { type: null, answers: report.answers };
              switch (report.type) {
                case 'jsa_sitio':
                  result.type = 'jsa-onSite';
                  break;
                case 'jsa_field_generic':
                  result.type = 'jsa-onField-generic';
                  break;
                case 'jsa_field_power_gen':
                  result.type = 'jsa-onField-powerGeneration';
                  break;
                case 'jsa_field_marine':
                  result.type = 'jsa-onField-marine';
                  break;
                case 'warehouse':
                  result.type = 'jsa-warehouse';
                  break;
                case 'service_generic':
                  result.type = 'service-generic';
                  break;
                case 'service_maintenance':
                  result.type = 'service-preventiveMaintenance';
                  break;
                case 'rot_contact_rotary':
                  result.type = 'ingersollRand-rotaryContactCooledRotary';
                  break;
                case 'rot_oil_free_sierra':
                  result.type = 'ingersollRand-rotaryOilFreeSierra';
                  break;
                case 'hl_eh_hb':
                  result.type = 'ingersollRand-hlEhHb';
                  break;
                case 'rot_contact_nirvana':
                  result.type = 'ingersollRand-rotaryContactCooledNirvana';
                  break;
                case 'rot_oil_free_nirvana':
                  result.type = 'ingersollRand-rotaryOilFreeNirvana';
                  break;
                case 'refrigerated':
                  result.type = 'ingersollRand-refrigeratedDryerSystem';
                  break;
              }
              return result;
            }), catchError(error => {
              this.isLoading = false;
              return throwError(error);
            })
          )
          .subscribe((result) => {
            this.isLoading = false;
            this.reportType = result.type;
            this.answers = result.answers;
          });
      }
    });
  }

  getSubTitle(): Observable<string> {
    const reportTypeSplit: string[] = this.reportType?.split('-') || [];
    for (let i = 1; i < reportTypeSplit.length; i++) {
      reportTypeSplit[i] = `${reportTypeSplit[i - 1]}-${reportTypeSplit[i]}`;
    }

    return combineLatest(reportTypeSplit.map(val => this.translareService.get(`reports.common.names.${val}`)))
    .pipe(map(all => all.join(' / ')));
  }
}
