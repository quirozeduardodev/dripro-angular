import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Answers, BaseForm } from './base-form';

export type ReportType = 'jsa-onSite' |
'jsa-warehouse' |
'jsa-onField-generic' |
'jsa-onField-powerGeneration' |
'jsa-onField-marine' |
'service-generic' |
'service-preventiveMaintenance' |
'ingersollRand-rotaryContactCooledRotary' |
'ingersollRand-rotaryOilFreeSierra' |
'ingersollRand-hlEhHb' |
'ingersollRand-rotaryOilFreeNirvana' |
'ingersollRand-refrigeratedDryerSystem' |
'ingersollRand-rotaryContactCooledNirvana';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  @Input() readOnly: boolean = false;
  @Input() type: ReportType | null = null;
  @Input() answers: Answers = {};

  @Output() onSubmit: EventEmitter<Answers> = new EventEmitter<Answers>();
  @Output() onSave: EventEmitter<Answers> = new EventEmitter<Answers>();

  @ViewChild('formulary') formulary: BaseForm | null = null;

  existingTypes: ReportType[] = [
    'jsa-onSite',
    'jsa-warehouse',
    'jsa-onField-generic',
  ];

  constructor(private authService: AuthService) {}

  get value(): Answers {
    return this.formulary?.value ?? {};
  }
  ngOnInit() {}

  get hasPermission(): Observable<boolean> {
    return this.authService.user
    .pipe(map(user => {
      const reportTypeSplit: string[] = this.type?.split('-') || [];
      if(user && reportTypeSplit.length > 0) {
        switch(reportTypeSplit[0]) {
          case 'jsa':
            return user.formPermissions.jsa;
            break;
          case 'service':
            return user.formPermissions.service;
            break;
          case 'ingersollRand':
            return user.formPermissions.ingersollRand;
            break;
        }
      }
      return false;
    }));
  }
}
