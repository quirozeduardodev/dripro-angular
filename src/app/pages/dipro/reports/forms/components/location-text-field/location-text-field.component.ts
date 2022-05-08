/* eslint-disable @typescript-eslint/member-ordering */
import {Component, Input, OnInit, Optional, Self} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NgControl} from '@angular/forms';

@Component({
  selector: 'form-location-text-field',
  templateUrl: './location-text-field.component.html',
  styleUrls: ['./location-text-field.component.scss'],
})
export class LocationTextFieldComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string | null = null;

  private _onChange: (val: any) => void = (value: number) => {};
  private _onTouched: () => void = () => {};
  private _value: string | null = null;
  private _isDisabled: boolean = false;
  constructor(@Self() @Optional() public ngControl?: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  get value(): string {
    return this._value ?? '';
  }
  get isDisabled(): boolean {
    return this._isDisabled;
  }

  get abstractControl(): AbstractControl | null {
    return this.ngControl?.control ?? null;
  }

  ngOnInit() {}

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  writeValue(obj: string | null): void {
    this._value = obj;
  }

  onChanged(event: Event) {
    const value = (event.target as HTMLInputElement).value ?? '';
    this._onChange(value);
  }

  onTouched() {
    this._onTouched();
  }
}
