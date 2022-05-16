import { Injectable } from '@angular/core';
import {EndpointService} from './endpoint.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {ReportFiltersRequest} from '../../types/request/report-filters.request';
import {Observable} from 'rxjs';
import {catchError, flatMap, map, mergeMap} from 'rxjs/operators';
import {TypeBuilder} from '../../util/type-builder';
import {ManualResponse} from '../../types/response/manual-response';

@Injectable()
export class ManualEndpointService extends EndpointService {

  constructor(httpClient: HttpClient, authService: AuthService) {
    super(httpClient, authService);
  }

  public all(): Observable<ManualResponse[]> {
    const url = `${this.apiUrl}/manuals/all`;
    return this.httpClient.get<any>(url, this.getOptions())
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)),
        mergeMap(value => TypeBuilder.manuals(value.manuals)));
  }

}
