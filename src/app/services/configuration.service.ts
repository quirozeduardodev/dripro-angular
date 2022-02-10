import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import * as moment from 'moment-timezone';
import {Observable, ReplaySubject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {take} from "rxjs/operators";

@Injectable()
export class ConfigurationService {

  public timeZone = 'America/Mexico_City';
  private _locale = 'en';
  private _countryCode = 'US';
  private _language$: ReplaySubject<string> = new ReplaySubject<string>();
  constructor(private localStorageService: LocalStorageService, private translateService: TranslateService) {
    // this.setLocale(this.locale);
  }


  public get language(): Observable<string> {
    return this._language$.asObservable();
  }

  public start(): void {
    this.localStorageService.language.pipe(take(1)).subscribe(language => {
      const split: string[] = language.split('_');
      this.setLanguage(split[0], split[1]);
    });
  }
  public setTimeZone(timezone: string): void {
    this.timeZone = timezone;
  }

  public dateToMoment(date: Date): moment.Moment {
    return moment(date).tz(this.timeZone);
  }

  public setLanguage(locale: string, countryCode: string): void {
    this._locale = locale;
    this._countryCode = countryCode;
    moment.locale(this._locale);
    const language = `${this._locale}_${this._countryCode}`;
    this._language$.next(language);
    this.translateService.use(language);
    this.localStorageService.setLanguage(language);
  }

  public tzToTimeZoneFormat(timezone: string | moment.Moment | null, format: string): string {
    if (!timezone) {
      return '';
    }
    const momentDate = (typeof timezone === 'string') ? moment(timezone) : timezone;
    return momentDate.tz(this.timeZone).format(format);
  }
}
