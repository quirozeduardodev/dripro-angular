import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-validator-message',
  templateUrl: './validator-message.component.html',
  styleUrls: ['./validator-message.component.scss'],
})
export class ValidatorMessageComponent implements OnInit {

  @Input() control: AbstractControl | null = null;
  constructor(private _translateService: TranslateService) {}

  ngOnInit() {}

  get message(): Observable<string> {
    let messageError = 'components.validator_message.invalid';
    const errors: ValidationErrors = this.control?.errors || [];
    const replace: string[] = [];
    if(errors.min) {
      messageError = 'components.validator_message.min';
    } else if(errors.max) {
      messageError = 'components.validator_message.max';
    } else if(errors.required) {
      messageError = 'components.validator_message.required';
    } else if(errors.requiredtrue) {
      messageError = 'components.validator_message.requiredTrue';
    } else if(errors.email) {
      messageError = 'components.validator_message.email';
    } else if(errors.minlength) {
      messageError = 'components.validator_message.minLength';
      replace.push(`${errors.minlength.requiredLength}`);
    } else if(errors.maxlength) {
      messageError = 'components.validator_message.maxLength';
      replace.push(`${errors.maxlength.requiredLength}`);
    } else if(errors.pattern) {
      messageError = 'components.validator_message.pattern';
    } else if(errors.nullvalidator) {
      messageError = 'components.validator_message.nullValidator';
    } else if(errors.compose) {
      messageError = 'components.validator_message.compose';
    } else if(errors.composeasync) {
      messageError = 'components.validator_message.composeAsync';
    }
    return this._translateService.get(messageError)
      .pipe(map(value => {
        let newValue: string = value;
        for (let i = 0; i <replace.length; i++) {
          newValue = newValue.replace(`$${i}`, replace[i]);
        }
        return newValue;
      }));
  }

}
