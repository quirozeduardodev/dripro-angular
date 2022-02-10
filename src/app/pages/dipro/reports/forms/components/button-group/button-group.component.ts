import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input, OnDestroy, Optional,
  QueryList, Self,
  ViewChild
} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {OptionComponent} from "../common/option/option.component";
import {Subscription} from "rxjs";

// export const BUTTON_GROUP_VALUE_ACCESSOR: any = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => ButtonGroupComponent),
//   multi: true
// };


@Component({
  selector: 'form-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  // providers: [BUTTON_GROUP_VALUE_ACCESSOR]
})
export class ButtonGroupComponent implements AfterContentInit, OnDestroy, ControlValueAccessor {

  @ContentChildren(OptionComponent) _optionElements: QueryList<OptionComponent> | null = null;

  private _optionElementsSubscription: Subscription | null = null;

  private _currentValue: any | null = null;
  private _options: OptionComponent[] = [];

  // Value Accessor
  private _onChange: ((_: any) => void) | null = null;
  private _onTouched: (() => void) | null = null;
  private _isDisabled: boolean = false;

  constructor(@Self() @Optional() public ngControl?: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit(): void {
    this._options = this._optionElements?.toArray() || [];
    this._optionElementsSubscription = this._optionElements?.changes.subscribe(value => {
      this._options = this._optionElements?.toArray() || [];
    }) ?? null;
  }

  get value(): string {
    return this._currentValue;
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  get textValue(): string {
    return this._options.find(value => value.value === this._currentValue)?.label ?? '';
  }

  get options(): OptionComponent[] {
    return this._options;
  }

  get control(): AbstractControl | null {
    return this.ngControl?.control ?? null;
  }

  selectItem(value: any) {
    if (this._isDisabled) {
      return;
    }
    this._currentValue = value;
    this._onChange ? this._onChange(this._currentValue) : null;
  }

  writeValue(value: any): void {
    this._currentValue = value;
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  ngOnDestroy(): void {
    this._optionElementsSubscription?.unsubscribe();
  }

}
