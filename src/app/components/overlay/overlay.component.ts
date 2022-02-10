import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {

  @Input() isVisible: boolean = false;

  constructor() {
  }

  toggle(): void {
    this.isVisible = !this.isVisible;
  }

  hide(): void {
    if(!this.isVisible) {
      return;
    }
    this.isVisible = false;
  }

  show(): void {
    if(this.isVisible) {
      return;
    }
    this.isVisible = true;
  }

  ngOnInit() {
  }

}
