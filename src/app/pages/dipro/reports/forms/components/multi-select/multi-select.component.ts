import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormControl,
  NgControl,
} from '@angular/forms';
import { OptionComponent } from '../common/option/option.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'form-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent
  implements OnInit, AfterContentInit, ControlValueAccessor, OnDestroy {

  @Input() placeholder: string | null = null;
  @ContentChildren(OptionComponent)
  _optionElements: QueryList<OptionComponent> | null = null;
  _value: any[] = [];
  formArray: FormArray = new FormArray([]);
  private _optionElementsSubscription: Subscription | null = null;
  private _options: OptionComponent[] = [];
  private _isDisabled: boolean = false;
  private _formArrayChangesSubscription: Subscription | null = null;
  private _onChange: (_: any) => void = (_: any) => {};
  private _onTouched: () => void = () => {};
  constructor(@Self() @Optional() public ngControl?: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this._formArrayChangesSubscription = this.formArray.valueChanges.subscribe(
      (val) => {
        this._value = val;
        this._onChange(this._value);
      }
    );
  }

  get value(): any[] {
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
    this._optionElementsSubscription =
      this._optionElements?.changes.subscribe((value) => {
        this._options = this._optionElements?.toArray() || [];
      }) ?? null;
  }

  writeValue(value: any | null): void {
    this._value = value && Array.isArray(value) ? value : [];
    this.formArray = new FormArray([]);
    this._isDisabled ? this.formArray.disable() : this.formArray.enable();
    this._value.forEach((val) => {
      this.addNew(val);
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
    this._isDisabled ? this.formArray.disable() : this.formArray.enable();
  }

  addNew(value: any = null): void {
    if (this._isDisabled) {
      return;
    }
    const formControl: FormControl = new FormControl(value);
    this._isDisabled ? formControl.disable() : formControl.enable();
    this.formArray.push(formControl);
    this._value = this.formArray.value;
    this._onChange(this._value);
  }

  removeAt(index: number): void {
    if (this._isDisabled) {
      return;
    }
    this.formArray.removeAt(index);
    this._value = this.formArray.value;
    this._onChange(this._value);
  }

  ngOnDestroy(): void {
    this._optionElementsSubscription?.unsubscribe();
    this._formArrayChangesSubscription?.unsubscribe();
  }

  getFromControlFromAbstractControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }
}
