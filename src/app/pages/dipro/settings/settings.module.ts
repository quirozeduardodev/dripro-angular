import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import {SettingsComponent} from "./settings.component";
import {LayoutsModule} from "../layouts/layouts.module";
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../../components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ChangePasswordDialogComponent} from "./components/change-password-dialog/change-password-dialog.component";


@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordDialogComponent
  ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        LayoutsModule,
        TranslateModule,
        ComponentsModule,
        ReactiveFormsModule
    ]
})
export class SettingsModule { }
