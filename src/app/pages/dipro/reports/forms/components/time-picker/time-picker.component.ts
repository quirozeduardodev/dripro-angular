import { Component, OnInit } from '@angular/core';
import {NgxMaterialTimepickerTheme} from "ngx-material-timepicker";
import {ControlValueAccessor} from "@angular/forms";

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
  constructor() { }

  ngOnInit() {}

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

}
