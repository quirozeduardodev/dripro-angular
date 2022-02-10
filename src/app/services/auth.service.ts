import {Injectable} from '@angular/core';
import {LoginRequest} from '../types/request/login.request';
import {Observable, of, ReplaySubject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, mergeMap, take} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';
import {UserResponse} from '../types/response/user.response';
import {OauthTokenResponse} from '../types/response/oauth-token.response';
import {TypeBuilder} from '../util/type-builder';

@Injectable()
export class AuthService {
  private _token: string | null = null;
  private _user: UserResponse | null = null;
  private _user$: ReplaySubject<UserResponse | null> = new ReplaySubject<UserResponse | null>(1);
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService) {
  }

  public async bootstrap(): Promise<void> {
    this._token = await this.localStorageService.accessToken.pipe(take(1)).toPromise();
    this._user = await this.loadUser().toPromise();
    this._user$.next(this._user);
  }

  public get token(): string | null {
    return this._token;
  }
  public get user(): Observable<UserResponse | null> {
    return this._user$.asObservable();
  }
  public login(loginType: LoginRequest): Observable<LoginEvent> {
    const url = `${environment.apiUrl}/auth/login`;
    const requestForm: FormData = new FormData();
    requestForm.append('email', loginType.email);
    requestForm.append('password', loginType.password);
    return this.httpClient.post<OauthTokenResponse | null>(url, requestForm)
      .pipe<LoginEvent, LoginEvent>(mergeMap(value => {
        if (value) {
          this._token = value.access_token;
          this.localStorageService.setAccessToken(this._token);
          this.localStorageService.setRefreshToken(value.refresh_token);
          return this.loadUser().pipe(map(user => {
            this._user = user;
            this._user$.next(this._user);
            this.localStorageService.setUserMe(user);
            return user ? LoginEvent.success : LoginEvent.unknownError;
          }));
        } else {
          this._token = null;
          this._user = null;
          this.localStorageService.setAccessToken(null);
          this.localStorageService.setRefreshToken(null);
          return this.loadUser().pipe(map(user => {
            this._user = user;
            this._user$.next(this._user);
            this.localStorageService.setUserMe(user);
            return user ? LoginEvent.success : LoginEvent.unknownError;
          }));
        }
      }), catchError((err, caught) => {
        // return  of(null);
        if (err.status >= 400 && err.status < 500) {
          return of(LoginEvent.invalidCredentials);
        } else if(err.status >= 500 && err.status < 600) {
          return of(LoginEvent.serverError);
        } else {
          return of(LoginEvent.unknownError);
        }
      }));
  }
  public logout(): void {
    this.localStorageService.setAccessToken(null);
    this.localStorageService.setRefreshToken(null);
    this._user = null;
    this._user$.next(null);
  }
  public recoveryPassword(email: string): Observable<ResetPasswordEvent> {
    const subject: ReplaySubject<ResetPasswordEvent> = new ReplaySubject<ResetPasswordEvent>(1);
    subject.next(ResetPasswordEvent.sending);
    this.httpClient.post(`${environment.apiUrl}/password/restart`, {email})
      .pipe(map(value => 'success'), catchError((err: HttpErrorResponse, caught) => {
        if (err.status === 403) {
          return of('invalidEmail');
        }
        return of('error')
      })).subscribe(value => {
       switch (value) {
         case 'success':
           subject.next(ResetPasswordEvent.success);
           break;
         case 'invalidEmail':
           subject.next(ResetPasswordEvent.invalidEmail);
           break;
         case 'error':
           subject.next(ResetPasswordEvent.error);
           break;
       }
       subject.complete();
    });
    return subject.asObservable();
  }
  public changePassword(password: string): Observable<ChangePasswordEvent> {
    const subject: ReplaySubject<ChangePasswordEvent> = new ReplaySubject<ChangePasswordEvent>(1);
    subject.next(ChangePasswordEvent.changing);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._token ?? ''}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.httpClient.post(`${environment.apiUrl}/auth/password/reset`, {password}, {headers})
      .pipe(map(value => {
        return 'success';
      }), catchError((err: HttpErrorResponse, caught) => of('error'))).subscribe(value => {
      switch (value) {
        case 'success':
          subject.next(ChangePasswordEvent.success);
          break;
        case 'error':
          subject.next(ChangePasswordEvent.error);
          break;
      }
      subject.complete();
    });
    return subject.asObservable();
  }
  public loadUser(): Observable<UserResponse | null> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this._token ?? ''}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    const url = `${environment.apiUrl}/user`;
    return this.httpClient.get<any>(url, {headers})
      .pipe(catchError((err: HttpErrorResponse) => {
        if(err.status === 401 || err.status === 403) {
          return of(null);
        }
        return this.localStorageService.userMe.pipe(take(1));
      }),mergeMap(value => TypeBuilder.user(value)));
  }
}

export enum LoginEvent {
  success,
  invalidCredentials,
  serverError,
  unknownError
}

export enum ResetPasswordEvent {
  success,
  sending,
  invalidEmail,
  error
}


export enum ChangePasswordEvent {
  success,
  changing,
  error
}
