import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {Observable, ReplaySubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs/operators';
import {DateTime} from 'luxon';

@Injectable()
export class ConfigurationService {

  public timeZone = 'America/Mexico_City';
  private _locale = 'es';
  private _countryCode = 'MX';
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

  public dateToMoment(date: Date): DateTime {
    return DateTime.fromJSDate(date).setZone(this.timeZone);
  }

  public setLanguage(locale: string, countryCode: string): void {
    this._locale = locale;
    this._countryCode = countryCode;
    DateTime.local({locale: this._locale});
    const language = `${this._locale}_${this._countryCode}`;
    this._language$.next(language);
    this.translateService.use(language);
    this.localStorageService.setLanguage(language);
  }

  public tzToTimeZoneFormat(timezone: string | DateTime | null, format: string): string {
    if (!timezone) {
      return '';
    }
    const momentDate: DateTime = (typeof timezone === 'string') ? DateTime.fromISO(timezone) : timezone;
    return momentDate.setZone(this.timeZone).toFormat(format);
  }
}
