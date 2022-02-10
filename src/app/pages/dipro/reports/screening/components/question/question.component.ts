import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {

  @Input() rootQuestion: QuestionT | null = null;
  @Output() rootQuestionChange: EventEmitter<QuestionT | null> = new EventEmitter<QuestionT | null>();

  @Input() prePath: string = '';

  @Output() onFinish: EventEmitter<string> = new EventEmitter<string>();

  formControlOptions: FormControl = new FormControl(null, [Validators.required]);

  nextQuestion: QuestionT | null = null;

  constructor() { }

  ngOnInit() {}

  back(): void {
    this.rootQuestionChange.emit(null);
  }

  finish() {
    this.formControlOptions.markAsDirty();
    if (this.formControlOptions.invalid) {
      return;
    }
    this.onFinish.emit(this.buildPath);
    this.formControlOptions.markAsUntouched();
  }

  next(): void {
    this.formControlOptions.markAsDirty();
    if (this.formControlOptions.invalid) {
      return;
    }
    const value: any = this.formControlOptions.value;
    const nextQuestion = this.getNextQuestionFromValue(value);
    if (nextQuestion) {
      this.nextQuestion = nextQuestion;
    }
    this.formControlOptions.markAsUntouched();
  }

  getNextQuestionFromValue(value: any): any | null {
    if(!this.rootQuestion) {
      return null;
    }
    const options: QuestionOptionT[] = this.rootQuestion.options;
    const idx = options.findIndex(value1 => value1.value === value);
    if (idx < 0) {
      return null;
    }
    return options[idx].child || null;
  }

  get isRoot(): boolean {
    return this.prePath.trim().length <= 0;
  }

  get buildPath(): string {
    return `${this.prePath + (this.isRoot ? '' : '-') + this.formControlOptions.value}`
  }
}

export interface QuestionT {
  name: string;
  options: QuestionOptionT[];
}

export interface QuestionOptionT {
  name: string;
  value: any;
  child?: QuestionT;
}
