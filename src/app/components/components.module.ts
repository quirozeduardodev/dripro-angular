import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorMessageComponent } from './validator-message/validator-message.component';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorMessageComponent } from './messages/error-message/error-message.component';
import { WarnMessageComponent } from './messages/warn-message/warn-message.component';
import { SuccessMessageComponent } from './messages/success-message/success-message.component';
import { OverlayComponent } from './overlay/overlay.component';
import { BaseDialogComponent } from './dialogs/base-dialog/base-dialog.component';
import { SheetComponent } from './sheet/sheet.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CenterLoadingComponent } from './common/center-loading/center-loading.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { WarnDialogComponent } from './dialogs/warn-dialog/warn-dialog.component';
import {DefaultLoadingAnimationComponent} from './common/default-loading-animation/default-loading-animation.component';

@NgModule({
  declarations: [
    ErrorMessageComponent,
    WarnMessageComponent,
    SuccessMessageComponent,
    ValidatorMessageComponent,
    OverlayComponent,
    BaseDialogComponent,
    SheetComponent,
    CenterLoadingComponent,
    ErrorDialogComponent,
    WarnDialogComponent,
    SuccessDialogComponent,
    DefaultLoadingAnimationComponent
  ],
  imports: [CommonModule, TranslateModule, DragDropModule, ReactiveFormsModule],
  exports: [
    ErrorMessageComponent,
    WarnMessageComponent,
    SuccessMessageComponent,
    ValidatorMessageComponent,
    OverlayComponent,
    BaseDialogComponent,
    SheetComponent,
    CenterLoadingComponent,
    DefaultLoadingAnimationComponent
  ],
})
export class ComponentsModule {}
