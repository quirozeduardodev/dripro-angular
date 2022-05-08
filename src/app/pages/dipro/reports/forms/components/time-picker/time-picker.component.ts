/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, Optional, Self } from '@angular/core';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'form-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent implements OnInit, ControlValueAccessor {
  theme: NgxMaterialTimepickerTheme = {
    dial: {
      dialBackgroundColor: '#000000',
    },
  };
  private _onChange: (val: any) => void = (value: number) => {};
  private _onTouched: () => void = () => {};
  private _value: string | null = null;
  private _isDisabled: boolean = false;
  constructor(@Self() @Optional() public ngControl?: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  get value(): string | null {
    return this._value;
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  ngOnInit() {}

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  changed($event: any): void {
    this._value = $event;
    this._onChange(this._value);
  }
}
