import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualsRoutingModule } from './manuals-routing.module';
import {ManualsComponent} from "./manuals.component";
import {LayoutsModule} from "../layouts/layouts.module";
import {ComponentsModule} from "../../../components/components.module";
import {TzModule} from "../../../pipes/tz/tz.module";
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    ManualsComponent
  ],
    imports: [
        CommonModule,
        ManualsRoutingModule,
        LayoutsModule,
        ComponentsModule,
        TzModule,
        TranslateModule
    ]
})
export class ManualsModule { }
