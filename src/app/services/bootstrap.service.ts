import { Injectable } from '@angular/core';
import {BehaviorSubject, forkJoin, from, Observable, of, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';
import {OfflineDataService} from './offline-data.service';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class BootstrapService {

  _status$: BehaviorSubject<BootstrapStatus> = new BehaviorSubject<BootstrapStatus>(BootstrapStatus.idle);
  constructor(
    public localStorageService: LocalStorageService,
    public configurationService: ConfigurationService,
    public authService: AuthService,
    public offlineDataService: OfflineDataService) { }

  get status(): Observable<BootstrapStatus> {
    return this._status$.asObservable();
  }

  public start(): void {

    this._status$.next(BootstrapStatus.initializing);
    forkJoin([
      from(this.localStorageService.loadData()),
      from(this.authService.bootstrap()),
    ]).pipe(catchError((err, caught) => {
      this._status$.next(BootstrapStatus.error);
      return throwError(err);
    }), mergeMap(value => {

      /// This bloc will be Executed after auth is loaded
      this.configurationService.start();
      this.offlineDataService.initialize();
      this.offlineDataService.synchronizeAll();

      return forkJoin([
        from('some')
        // from(this.reportSchemaService.synchronizeAll())
      ]);
    })).subscribe(value => {
      this._status$.next(BootstrapStatus.initialized);
    });
  }

}


export enum BootstrapStatus {
  idle,
  initializing,
  initialized,
  error
}
