import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Component({
  selector: 'app-validator-message',
  templateUrl: './validator-message.component.html',
  styleUrls: ['./validator-message.component.scss'],
})
export class ValidatorMessageComponent implements OnInit {

  @Input() control: AbstractControl | null = null;
  constructor() {}

  ngOnInit() {}

  get message(): string {
    let messageError = 'components.validator_message.invalid';
    const errors: ValidationErrors = this.control?.errors || [];
    if(errors['min']) {
      messageError = 'components.validator_message.min';
    } else if(errors['max']) {
      messageError = 'components.validator_message.max';
    } else if(errors['required']) {
      messageError = 'components.validator_message.required';
    } else if(errors['requiredTrue']) {
      messageError = 'components.validator_message.requiredTrue';
    } else if(errors['email']) {
      messageError = 'components.validator_message.email';
    } else if(errors['minLength']) {
      messageError = 'components.validator_message.minLength';
    } else if(errors['maxLength']) {
      messageError = 'components.validator_message.maxLength';
    } else if(errors['pattern']) {
      messageError = 'components.validator_message.pattern';
    } else if(errors['nullValidator']) {
      messageError = 'components.validator_message.nullValidator';
    } else if(errors['compose']) {
      messageError = 'components.validator_message.compose';
    } else if(errors['composeAsync']) {
      messageError = 'components.validator_message.composeAsync';
    }
    return messageError;
  }

}
