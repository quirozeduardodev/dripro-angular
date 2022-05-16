import { Injectable } from '@angular/core';
import {EndpointService} from './endpoint.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {TypeBuilder} from '../../util/type-builder';
import {MotorResponse} from '../../types/response/motor.response';

@Injectable()
export class MotorEndpointService extends EndpointService {

  constructor(httpClient: HttpClient, authService: AuthService) {
    super(httpClient, authService);
  }

  public all(): Observable<MotorResponse[]> {
    const url = `${this.apiUrl}/general/information/motors/all`;
    return this.httpClient.get<any[]>(url, this.getOptions())
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)),
        mergeMap(value => TypeBuilder.motors(value)));
  }
}
