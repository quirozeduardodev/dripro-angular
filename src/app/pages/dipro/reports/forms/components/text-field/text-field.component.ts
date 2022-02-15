/* eslint-disable @typescript-eslint/member-ordering */
import {
  Component,
  forwardRef,
  Input,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

// export const TEXT_FIELD_VALUE_ACCESSOR: any = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => TextFieldComponent),
//   multi: true
// };

@Component({
  selector: 'form-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  // providers: [TEXT_FIELD_VALUE_ACCESSOR]
})
export class TextFieldComponent implements OnInit, ControlValueAccessor {
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
