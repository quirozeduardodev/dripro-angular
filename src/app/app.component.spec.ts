import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {BootstrapService, BootstrapStatus} from "./services/bootstrap.service";
import {Observable, of} from "rxjs";
import {By} from "@angular/platform-browser";


describe('AppComponent', () => {

  const bootstrapService: Partial<BootstrapService> = {
    get status(): Observable<BootstrapStatus> {
      return of(BootstrapStatus.idle);
    },
    start(): void {

    }
  };

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: BootstrapService, useValue: bootstrapService}
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show an animation if is not initialized', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(fixture.debugElement.query(By.css('ion-app'))?.nativeElement).not.toBeNull();
    // app.hasBootstrapInitializationError.subscribe(value => {
    //
    // });
    // expect(app.bootstrapService).toBeTruthy();
  });
  // TODO: add more tests!

});
