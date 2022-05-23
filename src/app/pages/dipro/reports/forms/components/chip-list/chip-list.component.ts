/* eslint-disable @typescript-eslint/member-ordering */
import {Component, ElementRef, Input, OnInit, Optional, Self, ViewChild} from '@angular/core';
import {MatChipInputEvent, MatChipList} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {AbstractControl, ControlValueAccessor, NgControl} from '@angular/forms';

@Component({
  selector: 'form-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
})
export class ChipListComponent implements ControlValueAccessor {

  @Input() placeholder: string | null = null;

  @ViewChild('chipListInput') chipListInput: HTMLInputElement | null = null;

  separatorKeysCodes: number[] = [ENTER, COMMA];


  _value: string[] = [];

  textValue: string = '';

  // Value Accessor
  private _onChange: ((_: any) => void) = (_: any) => {};
  private _onTouched: (() => void) = () => {};
  private _isDisabled: boolean = false;

  constructor(@Self() @Optional() public ngControl?: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  get control(): AbstractControl | null {
    return this.ngControl?.control ?? null;
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

  writeValue(obj: any): void {
    this._value = obj && Array.isArray(obj) ? obj : [];
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  get value(): string[] {
    return this._value;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this._value.push(value);
      this._onChange(this._value);
    }

    // Clear the input value
    event.chipInput!.clear();

  }

  manualAdd(value: string): void {
    if (value && value.trim().length > 0) {
      this._value.push(value);
      this._onChange(this._value);
    }
    this.textValue = '';
  }

  remove(fruit: string): void {
    const index = this._value.indexOf(fruit);

    if (index >= 0) {
      this._value.splice(index, 1);
      this._onChange(this._value);
    }
  }

}
