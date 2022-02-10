import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManualsComponent} from "./manuals.component";

const routes: Routes = [
  {
    path: '',
    component: ManualsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualsRoutingModule { }
