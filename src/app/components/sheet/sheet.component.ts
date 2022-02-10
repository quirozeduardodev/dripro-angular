import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {Platform} from "@ionic/angular";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

const sheetAnimationDuration = 125;

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
  animations: [
    trigger('sheet', [
      state('true', style({
        transform: 'translateY(0)'
      })),
      state('false', style({
        transform: 'translateY(100%)'
      })),
      transition('* => *', [
        animate(`${sheetAnimationDuration}ms`)
      ]),
    ])
  ],
})
export class SheetComponent implements OnInit, OnChanges {

  @Input() visible = true;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  showOverlay = false;
  showSheet = false;

  private _backButtonSubscription: Subscription | null = null;

  private _status: SheetStatus = SheetStatus.closed;

  constructor(private platform: Platform) {}

  ngOnInit() {
    this._backButtonSubscription = this.platform.backButton.subscribeWithPriority(100, processNextHandler => {

    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
      if (changes['visible'].currentValue === true) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  close(): void {
    if (this._status === SheetStatus.closed || this._status === SheetStatus.closing) {
      return;
    }
    this._status = SheetStatus.closing;
    this.showSheet = false;
    setTimeout(() => {
      this.showOverlay = false;
      this._status = SheetStatus.closed;
      this.visibleChange.emit(false);
    }, sheetAnimationDuration);
  }

  open(): void {
    if (this._status === SheetStatus.opened || this._status === SheetStatus.opening) {
      return;
    }
    this._status = SheetStatus.opening;
    this.showOverlay = true;
    this.showSheet = true;
    setTimeout(() => {
      this._status = SheetStatus.opened;
      this.visibleChange.emit(true);
    }, sheetAnimationDuration);
  }

  toggle(): void {
    if (this._status == SheetStatus.opened || this._status == SheetStatus.opening) {
      this.close();
    } else {
      this.open();
    }
  }

  ngOnDestroy(): void {
    this._backButtonSubscription?.unsubscribe();
  }
}

enum SheetStatus {
  opened,
  opening,
  closing,
  closed
}
