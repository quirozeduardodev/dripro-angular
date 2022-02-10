import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DrawerComponent} from "./drawer/drawer.component";
import {IonicModule} from "@ionic/angular";
import {BackLayoutComponent} from "./back-layout/back-layout.component";
import {ComponentsModule} from "../../../components/components.module";
import {TranslateModule} from "@ngx-translate/core";
import {ChangePasswordDialogComponent} from "./drawer/components/change-password-dialog/change-password-dialog.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    DrawerComponent,
    BackLayoutComponent,
    ChangePasswordDialogComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  exports: [
    DrawerComponent,
    BackLayoutComponent
  ]
})
export class LayoutsModule { }
