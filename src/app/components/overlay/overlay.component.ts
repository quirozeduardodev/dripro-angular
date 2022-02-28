import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {

  isVisible: boolean = false;

  constructor(private _ref: ChangeDetectorRef) {
  }

  toggle(): void {
    this.isVisible = !this.isVisible;
    this._ref.detectChanges();
  }

  hide(): void {
    if(!this.isVisible) {
      return;
    }
    this.isVisible = false;
    this._ref.detectChanges();
  }

  show(): void {
    if(this.isVisible) {
      return;
    }
    this.isVisible = true;
    this._ref.detectChanges();
  }

  ngOnInit() {
  }

}
