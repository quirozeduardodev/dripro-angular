import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TzPipe} from "./tz.pipe";



@NgModule({
  declarations: [
    TzPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [TzPipe]
})
export class TzModule { }
