import {Injectable} from '@angular/core';
import {EndpointService} from './endpoint.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {TypeBuilder} from '../../util/type-builder';
import {BasicAnswerResponse} from '../../types/response/answer.response';

@Injectable()
export class AnswerEndpointService extends EndpointService {

  constructor(httpClient: HttpClient, authService: AuthService) {
    super(httpClient, authService);
  }

  public basicAll(): Observable<BasicAnswerResponse[]> {
    const url = `${this.apiUrl}/general/information/answers/all`;
    return this.httpClient.get<any[]>(url, this.getOptions())
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)),
        mergeMap(value => TypeBuilder.basicAnswers(value)));
  }
}
