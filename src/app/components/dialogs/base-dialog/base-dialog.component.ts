import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription, timer } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { OverlayComponent } from '../../overlay/overlay.component';

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
  @ViewChild('overlay') overlay: OverlayComponent | null = null;
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
    timer(sheetAnimationDuration).subscribe(() => {
      this.overlay?.hide();
      this._status = DialogStatus.closed;
    });
  }

  open(): void {
    if (
      this._status === DialogStatus.opened ||
      this._status === DialogStatus.opening
    ) {
      return;
    }
    this._status = DialogStatus.opening;
    this.overlay?.show();
    this.showDialog = true;
    timer(sheetAnimationDuration).subscribe(() => {
      this._status = DialogStatus.opened;
    });
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
