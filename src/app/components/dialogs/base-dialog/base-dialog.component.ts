import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const sheetAnimationDuration = 175;

@Component({
  selector: 'app-base-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.scss'],
  animations: [
    trigger('dialog', [
      state(
        'true',
        style({
          transform: 'scale(1)',
          opacity: 1,
        })
      ),
      state(
        'false',
        style({
          transform: 'scale(0.2)',
          opacity: 0.5,
        })
      ),
      transition('* => *', [animate(`${sheetAnimationDuration}ms`)]),
    ]),
  ],
})
export class BaseDialogComponent implements OnInit, OnDestroy {
  @Input() visible = true;
  @Input() overlayClose = true;
  showOverlay = false;
  showDialog = false;

  private _backButtonSubscription: Subscription | null = null;

  private _status: DialogStatus = DialogStatus.closed;

  constructor(private platform: Platform) {}

  onChanges(changes: SimpleChanges): void {
    if (changes.visible) {
      if (changes.visible.currentValue === true) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  ngOnInit() {
    this._backButtonSubscription =
      this.platform.backButton.subscribeWithPriority(
        100,
        (processNextHandler) => {}
      );
  }

  close(): void {
    if (
      this._status === DialogStatus.closed ||
      this._status === DialogStatus.closing
    ) {
      return;
    }
    this._status = DialogStatus.closing;
    this.showDialog = false;
    setTimeout(() => {
      this.showOverlay = false;
      this._status = DialogStatus.closed;
    }, sheetAnimationDuration);
  }

  open(): void {
    if (
      this._status === DialogStatus.opened ||
      this._status === DialogStatus.opening
    ) {
      return;
    }
    this._status = DialogStatus.opening;
    this.showOverlay = true;
    this.showDialog = true;
    setTimeout(() => {
      this._status = DialogStatus.opened;
    }, sheetAnimationDuration);
  }

  toggle(): void {
    if (
      this._status === DialogStatus.opened ||
      this._status === DialogStatus.opening
    ) {
      this.close();
    } else {
      this.open();
    }
  }

  ngOnDestroy(): void {
    this._backButtonSubscription?.unsubscribe();
  }
}

enum DialogStatus {
  opened,
  opening,
  closing,
  closed,
}
