import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ScreeningComponent } from './screening/screening.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ReportsComponent } from './reports.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { TzModule } from '../../../pipes/tz/tz.module';
import { ComponentsModule } from '../../../components/components.module';
import { FiltersSheetComponent } from './components/filters-sheet/filters-sheet.component';
import { QuestionComponent } from './screening/components/question/question.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from './forms/forms.module';
import { CreateComponent } from './create/create.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InfiniteReportsComponent } from './components/infinite-reports/infinite-reports.component';
import { InfiniteReportsGridComponent } from './components/infinite-reports-grid/infinite-reports-grid.component';

@NgModule({
  declarations: [
    ReportsComponent,
    CreateComponent,
    ViewComponent,
    EditComponent,
    ScreeningComponent,
    FiltersSheetComponent,
    InfiniteReportsComponent,
    InfiniteReportsGridComponent,
    QuestionComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    LayoutsModule,
    TzModule,
    ComponentsModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule,
  ],
})
export class ReportsModule {}
