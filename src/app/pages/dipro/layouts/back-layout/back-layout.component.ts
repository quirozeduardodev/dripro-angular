import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-back-layout',
  templateUrl: './back-layout.component.html',
  styleUrls: ['./back-layout.component.scss'],
})
export class BackLayoutComponent implements OnInit {

  @Input() title: string = '';
  @Input() subTitle: string | null = null;
  @Output() onBackPressed: EventEmitter<void> = new EventEmitter<void>();
  @Input() canBack: Observable<boolean> | null = null;
  constructor(private location: Location) { }

  ngOnInit() {}

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
}
