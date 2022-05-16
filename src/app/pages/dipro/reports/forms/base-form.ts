import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';

export declare type Answers = {[q: string]: any};

@Component({
  template: ''
})
export abstract class BaseForm implements OnChanges {
  @Input() readOnly: boolean = false;
  @Input() answers: Answers = {};
  @Output() onSave: EventEmitter<Answers> = new EventEmitter<Answers>();
  @Output() onSubmit: EventEmitter<Answers> = new EventEmitter<Answers>();

  get value(): Answers {
    return this.formGroup.value ?? {};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.answers) {
      this.updateValue(changes.answers.currentValue ?? {});
    }
    if (changes.readOnly) {
      if (changes.readOnly.currentValue === true) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
    }
  }
  protected scrollToFirstInvalidControl(): void {
    const elements = document.querySelectorAll('form .ng-invalid');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    elements.length > 0 ? elements[0].scrollIntoView(): null;
  }

  private updateValue(obj: {[p: string]: any}): void {
    for (const [key, value] of Object.entries(obj)) {
      const keyEscaped = key.replace(/[\u200B-\u200D\u200B\uFEFF]/g, '');
      if (this.formGroup.controls[keyEscaped]) {
        this.formGroup.controls[keyEscaped].setValue(value);
      }
    }
    if ('onAnswersUpdated' in this) {
      // @ts-ignore
      this.onAnswersUpdated(obj);
    }
  }

  abstract get formGroup(): FormGroup;

}

export declare interface OnAnswer {
  onAnswersUpdated(answers: {[p: string]: any}): void;
}
