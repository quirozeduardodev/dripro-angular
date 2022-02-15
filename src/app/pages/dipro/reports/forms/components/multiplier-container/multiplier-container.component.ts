import { AfterContentInit, Component, ContentChildren, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OptionComponent } from '../common/option/option.component';

@Component({
  selector: 'form-multiplier-container',
  templateUrl: './multiplier-container.component.html',
  styleUrls: ['./multiplier-container.component.scss'],
})
export class MultiplierContainerComponent implements ControlValueAccessor, OnChanges, AfterContentInit, OnDestroy {

  /* This must be the root FormGroup whera all answers are stored */
  @Input() formControlNames: {[p: string]: () => FormControl} = {};
  @ContentChildren(OptionComponent) _optionElements: QueryList<OptionComponent> | null = null;

  rootFormGroup: FormGroup | null = null;

  private _value: any = null;
  private _options: OptionComponent[] = [];
  private _optionElementsSubscription: Subscription | null = null;
  private _rootFormGroupChangesSubscription: Subscription | null = null;
  private _isDisabled: boolean = false;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.formControlNames) {
    }
  }

  _onTouched: () => void = () => {};
  _onChanged: (obj: any) => void = (obj: any) => {};

  ngAfterContentInit(): void {
    this._options = this._optionElements?.toArray() || [];
    this._optionElementsSubscription = this._optionElements?.changes.subscribe(value => {
      this._options = value?.toArray() || [];
    }) ?? null;
    // this.formGroup?.controls.asdasd.va
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
    this._value = obj;
  }

  ngOnDestroy(): void {
    this._optionElementsSubscription?.unsubscribe();
  }

  private async _refreshRootFormControl(): Promise<void> {
    this.rootFormGroup =  await this._createCopyOfFormGroup();
  }

  private async _createCopyOfFormGroup(): Promise<FormGroup | null> {
    const all: {[p: string]: AbstractControl} = {};
    for (const [key, value] of Object.entries<() => FormControl>(this.formControlNames)) {
      const fG = await value();
      all[key] = fG;
    }

    return new FormGroup(all);
  }
}
