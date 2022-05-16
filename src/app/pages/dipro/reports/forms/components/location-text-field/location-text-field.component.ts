/* eslint-disable @typescript-eslint/member-ordering */
import {Component, Input, OnInit, Optional, Self} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NgControl} from '@angular/forms';
import {Geolocation} from '@capacitor/geolocation';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';

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
  private _retrievedValue: string | null = '';
  constructor(private _httpClient: HttpClient, @Self() @Optional() public ngControl?: NgControl) {
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

  ngOnInit(): void {
    Geolocation.getCurrentPosition().then(coordinates => {
      const url = `${environment.apiUrl}/general/geocoder?lat=${coordinates.coords.latitude}&lng=${coordinates.coords.longitude}`;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      this._httpClient.get(url, {responseType: 'text'}).subscribe(value => {
        this._retrievedValue = value as (string | null);
        this._value = this._value && this._value.length > 0 ? this._value : this._retrievedValue ;
        this._onChange(this._value);
      });
    });

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

  writeValue(obj: string | null): void {
    this._value = obj && obj.length > 0 ? obj : this._retrievedValue ;
  }

  onChanged(event: Event) {
    const value = (event.target as HTMLInputElement).value ?? '';
    this._onChange(value);
  }

  onTouched() {
    this._onTouched();
  }
}
