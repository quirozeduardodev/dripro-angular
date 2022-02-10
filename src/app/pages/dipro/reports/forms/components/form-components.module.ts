import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchSelectComponent} from "./search-select/search-select.component";
import {OptionComponent} from "./common/option/option.component";
import {ComponentsModule} from "../../../../../components/components.module";
import {ButtonGroupComponent} from "./button-group/button-group.component";
import {ImagePickerComponent} from "./image-picker/image-picker.component";
import {SignaturePadComponent} from "./signature-pad/signature-pad.component";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {TimePickerComponent} from "./time-picker/time-picker.component";
import {DatePickerComponent} from "./date-picker/date-picker.component";
import {CheckboxGroupComponent} from "./checkbox-group/checkbox-group.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TextFieldComponent} from "./text-field/text-field.component";
import {SelectComponent} from "./select/select.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {ReactiveFormsModule} from "@angular/forms";
import {ChipListComponent} from "./chip-list/chip-list.component";
import {MatChipsModule} from "@angular/material/chips";
import {TextAreaComponent} from "./text-area/text-area.component";
import {MultiSelectComponent} from "./multi-select/multi-select.component";



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
    TextFieldComponent,
    TextAreaComponent,
    SelectComponent,
    ChipListComponent,
    MultiSelectComponent

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
    MatChipsModule
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
    TextFieldComponent,
    TextAreaComponent,
    SelectComponent,
    ChipListComponent,
    MultiSelectComponent
  ]
})
export class FormComponentsModule { }
