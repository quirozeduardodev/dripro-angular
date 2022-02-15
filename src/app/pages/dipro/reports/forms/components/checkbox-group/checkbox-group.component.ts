/* eslint-disable @typescript-eslint/member-ordering */
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  forwardRef,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  Self
} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {OptionComponent} from "../common/option/option.component";
import {Subscription} from "rxjs";

// export const CHECKBOX_GROUP_VALUE_ACCESSOR: any = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => CheckboxGroupComponent),
//   multi: true
// };


@Component({
  selector: 'form-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  // providers: [CHECKBOX_GROUP_VALUE_ACCESSOR]
})
export class CheckboxGroupComponent implements OnInit, AfterContentInit, OnDestroy, ControlValueAccessor {

  private _value: any[] = [];

  private _onTouched: () => void = () => {};
  private _onChanged: (obj: any) => void = (obj: any) => {};
  private _isDisabled: boolean = false;

  private _options: OptionComponent[] = [];
  private _optionElementsSubscription: Subscription | null = null;

  @ContentChildren(OptionComponent) _optionElements: QueryList<OptionComponent> | null = null;

  constructor(@Self() @Optional() public ngControl?: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  get value(): boolean[] {
    return this._value;
  }

  get options(): OptionComponent[] {
    return this._options;
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  get control(): AbstractControl | null {
    return this.ngControl?.control ?? null;
  }

  ngOnInit() {

  }

  ngAfterContentInit(): void {
    this._options = this._optionElements?.toArray() || [];
    this._optionElementsSubscription = this._optionElements?.changes.subscribe(value => {
      this._options = value?.toArray() || [];
    }) ?? null;
  }

  registerOnChange(fn: (obj: any) => void): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    this._value = Array.isArray(obj) ? obj : [];
  }

  ngOnDestroy(): void {
    this._optionElementsSubscription?.unsubscribe();
  }

  optionChanged(option: OptionComponent, checked: boolean): void {
    this._onTouched();
    if (checked) {
      if (!this._value.includes(option.value)) {
        this._value.push(option.value);
        this._value = [...this._value]; /// This is just for the rxjs render
        this._onChanged(this._value);
      }
    } else {
      const idx = this._value.indexOf(option.value);
      if (idx >= 0) {
        this._value.splice(idx, 1);
        this._value = [...this._value]; /// This is just for the rxjs render
        this._onChanged(this._value);
      }
    }
  }
}
