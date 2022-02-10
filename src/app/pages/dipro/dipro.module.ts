import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiproRoutingModule } from './dipro-routing.module';
import {IonicModule} from "@ionic/angular";
import {ComponentsModule} from "../../components/components.module";


@NgModule({
  declarations: [
  ],
    imports: [
      CommonModule,
      DiproRoutingModule,
      IonicModule,
      ComponentsModule
    ]
})
export class DiproModule {
  constructor() {
  }
}
