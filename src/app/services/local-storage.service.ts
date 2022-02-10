import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {UserResponse} from "../types/response/user.response";

@Injectable()
export class LocalStorageService {

  reservedKeys = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    userMe: 'userMe',
    language: 'language'
  };

  private _accessToken: string | null = null;
  private _accessToken$: ReplaySubject<string | null> = new ReplaySubject<string | null>(1);

  private _refreshToken: string | null = null;
  private _refreshToken$: ReplaySubject<string | null> = new ReplaySubject<string | null>(1);

  private _userMe: UserResponse | null = null;
  private _userMe$: ReplaySubject<UserResponse | null> = new ReplaySubject<UserResponse | null>(1);

  private _language: string = 'en_US';
  private _language$: ReplaySubject<string> = new ReplaySubject<string>(1);

  constructor() {
  }
  public async loadData(): Promise<void> {
    /**
     * Here will load saved values
     */

    const accessToken: string | null = await this.getString(this.reservedKeys.accessToken);
    const refreshToken: string | null = await this.getString(this.reservedKeys.refreshToken);
    const userMe: UserResponse | null = await this.getObject<UserResponse>(this.reservedKeys.userMe);
    const language: string | null = await this.getString(this.reservedKeys.language);

    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
    this.setUserMe(userMe);
    this.setLanguage(language || 'en_US');


  }

  /// Accessor getters
  public get accessToken(): Observable<string | null> {
    return this._accessToken$.asObservable();
  }
  public get refreshToken(): Observable<string | null> {
    return this._refreshToken$.asObservable();
  }
  public get userMe(): Observable<UserResponse | null> {
    return this._userMe$.asObservable();
  }
  public get language(): Observable<string> {
    return this._language$.asObservable();
  }

  public setAccessToken(token: string | null): void {
    this._accessToken = token;
    this._accessToken$.next(this._accessToken);
    this.setString(this.reservedKeys.accessToken, this._accessToken ?? '');
  }
  public setRefreshToken(token: string | null): void {
    this._refreshToken = token;
    this._refreshToken$.next(this._refreshToken);
    this.setString(this.reservedKeys.refreshToken, this._refreshToken ?? '');
  }
  public setUserMe(user: UserResponse | null): void {
    this._userMe = user;
    this._userMe$.next(this._userMe);
    this.setObject(this.reservedKeys.userMe, this._userMe);
  }
  public setLanguage(language: string): void {
    this._language = language;
    this._language$.next(this._language);
    this.setString(this.reservedKeys.language, this._language);
  }
  // Basic methods
  public setString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public setNumber(key: string, value: number): void {
    this.setString(key, String(value));
  }

  public setBoolean(key: string, value: boolean): void {
    this.setNumber(key, (value ? 1 : 0));
  }

  public setObject<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public async getString(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }

  public async getNumber(key: string): Promise<number> {
    const value = Number( await this.getString(key));
    if (isNaN(value)) {
      throw new Error(`Value of ${key} is not a number`);
    }
    return value;
  }

  public async getBoolean(key: string): Promise<boolean> {
    const value = Number(await this.getString(key));
    if (isNaN(value)) {
      throw new Error(`Value of ${key} is not a boolean`);
    }
    return (value === 1);
  }

  public async getObject<T>(key: string): Promise<T | null> {
    const value = await this.getString(key);
    if (value) {
      return await JSON.parse(value) as T;
    } else {
      return null;
    }
  }
}
