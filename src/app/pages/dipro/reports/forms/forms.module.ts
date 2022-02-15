import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import { JsaOnSiteComponent } from './jsa-on-site/jsa-on-site.component';
import { ComponentsModule } from '../../../../components/components.module';
import { FormComponentsModule } from './components/form-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { JsaWarehouseComponent } from './jsa-warehouse/jsa-warehouse.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JsaOnFieldGenericComponent } from './jsa-on-field-generic/jsa-on-field-generic.component';
import { JsaOnFieldMarineComponent } from './jsa-on-field-marine/jsa-on-field-marine.component';
import { JsaOnFieldPowerGenerationComponent } from './jsa-on-field-power-generation/jsa-on-field-power-generation.component';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceMaintenanceComponent } from './service-maintenance/service-maintenance.component';
import { IngersollRandHlEhHbComponent } from './ingersoll-rand-hl-eh-hb/ingersoll-rand-hl-eh-hb.component';
import {
  IngersollRandRefrigeratedDryerSystemComponent
} from './ingersoll-rand-refrigerated-dryer-system/ingersoll-rand-refrigerated-dryer-system.component';
import {
  IngersollRandRotaryContactCooledNirvanaComponent
} from './ingersoll-rand-rotary-contact-cooled-nirvana/ingersoll-rand-rotary-contact-cooled-nirvana.component';
import {
  IngersollRandRotaryContactCooledRotaryComponent
} from './ingersoll-rand-rotary-contact-cooled-rotary/ingersoll-rand-rotary-contact-cooled-rotary.component';
import {
  IngersollRandRotaryOilFreeNirvanaComponent
} from './ingersoll-rand-rotary-oil-free-nirvana/ingersoll-rand-rotary-oil-free-nirvana.component';
import {
  IngersollRandRotaryOilFreeSierraComponent
} from './ingersoll-rand-rotary-oil-free-sierra/ingersoll-rand-rotary-oil-free-sierra.component';
import { ServiceGenericComponent } from './service-generic/service-generic.component';
export const createTranslateLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './assets/i18n/reports/', '.json');
  import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    FormsComponent,
    JsaOnSiteComponent,
    JsaWarehouseComponent,
    JsaOnFieldGenericComponent,
    JsaOnFieldMarineComponent,
    JsaOnFieldPowerGenerationComponent,
    ServiceMaintenanceComponent,
    ServiceGenericComponent,
    IngersollRandRotaryOilFreeSierraComponent,
    IngersollRandRotaryOilFreeNirvanaComponent,
    IngersollRandRotaryContactCooledRotaryComponent,
    IngersollRandRotaryContactCooledNirvanaComponent,
    IngersollRandRefrigeratedDryerSystemComponent,
    IngersollRandHlEhHbComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormComponentsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatRadioModule,
    TranslateModule,
  ],
  exports: [FormsComponent],
})
export class FormsModule {}
