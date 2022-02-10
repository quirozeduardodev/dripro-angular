import {Component, OnInit} from '@angular/core';
import {BootstrapService, BootstrapStatus} from "./services/bootstrap.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(public bootstrapService: BootstrapService) {
  }

  ngOnInit(): void {
    this.startBootstrap();
  }

  startBootstrap(): void {
    this.bootstrapService.start();
  }

  get isBootstrapInitialized(): Observable<boolean> {
    return this.bootstrapService.status.pipe(map(value => value === BootstrapStatus.initialized));
  }

  get hasBootstrapInitializationError(): Observable<boolean> {
    return this.bootstrapService.status.pipe(map(value => value === BootstrapStatus.error));
  }
}
