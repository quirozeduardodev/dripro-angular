import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
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

  private updateValue(obj: {[p: string]: any}): void {
    for (const [key, value] of Object.entries(obj)) {
      const keyEscaped = key.replace(/[\u200B-\u200D\u200B\uFEFF]/g, '');
      if (this.formGroup.controls[keyEscaped]) {
        this.formGroup.controls[keyEscaped].setValue(value);
      }
    }
  }

  abstract get formGroup(): FormGroup;
}
