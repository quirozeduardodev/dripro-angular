import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from "./login/login.component";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";
import {TranslateModule} from "@ngx-translate/core";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ProcessStatusDialogComponent} from "./forgot-password/components/process-status-dialog/process-status-dialog.component";


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ProcessStatusDialogComponent
  ],
  imports: [
      CommonModule,
      AuthRoutingModule,
      IonicModule,
      ReactiveFormsModule,
      ComponentsModule,
      TranslateModule
  ],
})
export class AuthModule { }
