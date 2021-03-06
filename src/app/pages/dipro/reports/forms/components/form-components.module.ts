import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchSelectComponent } from './search-select/search-select.component';
import { OptionComponent } from './common/option/option.component';
import { ComponentsModule } from '../../../../../components/components.module';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { SignaturePadComponent } from './signature-pad/signature-pad.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TextFieldComponent } from './text-field/text-field.component';
import { SelectComponent } from './select/select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChipListComponent } from './chip-list/chip-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { TextAreaComponent } from './text-area/text-area.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { MultiplierFormControlDirective } from './directives/multiplier-form-control.directive';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import {LocationTextFieldComponent} from './location-text-field/location-text-field.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    ButtonGroupComponent,
    SearchSelectComponent,
    OptionComponent,
    ImagePickerComponent,
    SignaturePadComponent,
    TimePickerComponent,
    DatePickerComponent,
    CheckboxGroupComponent,
    RadioGroupComponent,
    TextFieldComponent,
    LocationTextFieldComponent,
    TextAreaComponent,
    SelectComponent,
    ChipListComponent,
    MultiSelectComponent,
    MultiplierFormControlDirective
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NgxMaterialTimepickerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatButtonModule,
    FormsModule,
  ],
  exports: [
    ButtonGroupComponent,
    SearchSelectComponent,
    OptionComponent,
    ImagePickerComponent,
    SignaturePadComponent,
    TimePickerComponent,
    DatePickerComponent,
    CheckboxGroupComponent,
    RadioGroupComponent,
    TextFieldComponent,
    LocationTextFieldComponent,
    TextAreaComponent,
    SelectComponent,
    ChipListComponent,
    MultiSelectComponent,
    MultiplierFormControlDirective
  ],
})
export class FormComponentsModule {}
