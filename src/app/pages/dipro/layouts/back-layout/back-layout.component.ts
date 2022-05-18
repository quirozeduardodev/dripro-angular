import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-back-layout',
  templateUrl: './back-layout.component.html',
  styleUrls: ['./back-layout.component.scss'],
})
export class BackLayoutComponent implements OnInit, OnDestroy {

  @Input() title: string = '';
  @Input() subTitle: string | null = null;
  @Output() onBackPressed: EventEmitter<void> = new EventEmitter<void>();
  @Input() canBack: Observable<boolean> | null = null;
  backButtonSubscription: Subscription | null = null;
  constructor(private location: Location, private _platform: Platform) { }

  ngOnInit() {
    this.backButtonSubscription = this._platform.backButton.subscribe(value => {
      this.backAction();
    });
  }

  backAction(): void {
    this.onBackPressed.emit();
    if (this.canBack) {
      this.canBack.pipe(take(1)).subscribe(value => {
        value === true ? this.location.back() : null;
      });
    } else {
      this.location.back();
    }
  }

  ngOnDestroy(): void {
    this.backButtonSubscription?.unsubscribe();
  }
}
