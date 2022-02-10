import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfflineDataRoutingModule } from './offline-data-routing.module';
import {OfflineDataComponent} from "./offline-data.component";
import {LayoutsModule} from "../layouts/layouts.module";
import {TranslateModule} from "@ngx-translate/core";
import {TzModule} from "../../../pipes/tz/tz.module";


@NgModule({
  declarations: [
    OfflineDataComponent
  ],
    imports: [
        CommonModule,
        OfflineDataRoutingModule,
        LayoutsModule,
        TranslateModule,
        TzModule
    ]
})
export class OfflineDataModule { }
