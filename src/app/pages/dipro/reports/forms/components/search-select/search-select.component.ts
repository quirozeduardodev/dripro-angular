import {
  AfterContentInit,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef, forwardRef, HostListener, Input, OnDestroy, Optional,
  QueryList, Self,
  ViewChild
} from '@angular/core';
import {OptionComponent} from "../common/option/option.component";
import {AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {BaseDialogComponent} from "../../../../../../components/dialogs/base-dialog/base-dialog.component";
import {BehaviorSubject, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";


// export const SEARCH_SELECT_VALUE_ACCESSOR: any = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => SearchSelectComponent),
//   multi: true
// };

@Component({
  selector: 'form-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss'],
  // providers: [SEARCH_SELECT_VALUE_ACCESSOR]
})
export class SearchSelectComponent implements AfterContentInit, OnDestroy, ControlValueAccessor {

  @Input() placeholder: string = '';

  @ViewChild('button') button: ElementRef<HTMLButtonElement> | null = null;
  @ViewChild('dialog') dialog: BaseDialogComponent | null = null;

  @ContentChildren(OptionComponent) _optionElements: QueryList<OptionComponent> | null = null;

  private _optionElementsSubscription: Subscription | null = null;

  private _value: any | null = null;
  private _options: OptionComponent[] = [];
  private _filteredOptions: OptionComponent[] = [];

  // Value Accessor
  private _onChange: ((_: any) => void) = (_: any) => {};
  private _onTouched: (() => void) = () => {};
  private _isDisabled: boolean = false;

  formControlTextValue: FormControl = new FormControl('');
  formControlFilter: FormControl = new FormControl('');
  constructor(@Self() @Optional() public ngControl?: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit(): void {
    this._options = this._optionElements?.toArray() || [];
    this.refreshTextValue();
    this._optionElementsSubscription = this._optionElements?.changes.subscribe(value => {
      this._options = this._optionElements?.toArray() || [];
      this._filteredOptions = this._options;
      this.refreshTextValue();
    }) ?? null;
    this.formControlFilter.valueChanges.pipe(
      debounceTime(250),
      map<any, string>(value => (value.toString() ?? '' ).trim()),
      distinctUntilChanged())
      .subscribe(value => {
        if(value && value.length > 0) {
          this._filteredOptions = this._options.filter(item => item.label.toLowerCase().trim().includes(value.toLowerCase()));
        } else {
          this._filteredOptions = this._options;
        }
      });
  }

  refreshTextValue(): void {
    this.formControlTextValue.setValue(this._options.find(value => value.value === this._value)?.label ?? '');
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  get options(): OptionComponent[] {
    return this._filteredOptions;
  }

  get control(): AbstractControl | null {
    return this.ngControl?.control ?? null;
  }

  openDialog() {
    if (this._isDisabled) {
      return;
    }
    this.dialog?.open();
  }

  writeValue(value: any): void {
    this._value = value;
    this.refreshTextValue();
  }


  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControlTextValue.disable() : this.formControlTextValue.enable();
    this._isDisabled = isDisabled;
  }

  @HostListener('click', ['$event'])
  clickOnHost(event: PointerEvent): void {
    if (this._isDisabled) {
      return;
    }
    event.stopPropagation();
    this.button?.nativeElement.focus();
    this.openDialog();
    this._onTouched ? this._onTouched() : null;
    this.formControlFilter.setValue('');
  }

  ngOnDestroy(): void {
    this._optionElementsSubscription?.unsubscribe();
  }

  selectItem(value: OptionComponent) {
    this._value = value.value;
    this.dialog?.close();
    this._onChange ? this._onChange(this._value) : null;
    this.refreshTextValue();
  }
}
