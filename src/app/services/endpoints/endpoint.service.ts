import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class EndpointService {
  protected apiUrl: string = environment.apiUrl;
  protected baseUrl: string = environment.baseUrl;

  constructor(protected httpClient: HttpClient, protected authService: AuthService) {
  }

  public getOptions(): { headers: HttpHeaders} {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token ?? ''}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return {headers};
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 401:
        // this.authService.redirectToLogin();
        break;
      case 403:

        break;
    }
    throw throwError(error);
  }
}
