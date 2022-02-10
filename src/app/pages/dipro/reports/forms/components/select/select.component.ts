import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  Self
} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {OptionComponent} from "../common/option/option.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'form-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements AfterContentInit, ControlValueAccessor, OnDestroy {
  @ContentChildren(OptionComponent) _optionElements: QueryList<OptionComponent> | null = null;
  private _optionElementsSubscription: Subscription | null = null;
  private _options: OptionComponent[] = [];

  _value: any | null = null;
  // Value Accessor
  private _onChange: (_: any) => void = (_: any) => {};
  private _onTouched: () => void = () => {};
  private _isDisabled: boolean = false;
  constructor(@Self() @Optional() public ngControl?: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  get value(): any | null {
    return this._value;
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  get options(): OptionComponent[] {
    return this._options;
  }

  ngAfterContentInit(): void {
    this._options = this._optionElements?.toArray() || [];
    this._optionElementsSubscription = this._optionElements?.changes.subscribe(value => {
      this._options = this._optionElements?.toArray() || [];
    }) ?? null;
  }

  writeValue(value: any | null): void {
    this._value = value;
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
