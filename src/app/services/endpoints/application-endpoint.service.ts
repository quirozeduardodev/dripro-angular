import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, mergeMap } from 'rxjs/operators';
import { ApplicationResponse } from 'src/app/types/response/application.response';
import { TypeBuilder } from 'src/app/util/type-builder';
import { AuthService } from '../auth.service';
import { EndpointService } from './endpoint.service';

@Injectable()
export class ApplicationEndpointService extends EndpointService {

  constructor(httpClient: HttpClient, authService: AuthService) {
    super(httpClient, authService);
  }

  public all(): Observable<ApplicationResponse[]> {
    const url = `${this.apiUrl}/general/information/applications/all`;
    return this.httpClient.get<any[]>(url, this.getOptions())
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)),
        mergeMap(value => TypeBuilder.applications(value)));
  }
}
