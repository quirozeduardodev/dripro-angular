import { Injectable } from '@angular/core';
import {EndpointService} from "./endpoint.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Observable} from "rxjs";
import {catchError, mergeMap} from "rxjs/operators";
import {TypeBuilder} from "../../util/type-builder";
import {BasicUserResponse} from "../../types/response/user.response";

@Injectable()
export class UserEndpointService extends EndpointService {

  constructor(httpClient: HttpClient, authService: AuthService) {
    super(httpClient, authService);
  }

  public basicAll(): Observable<BasicUserResponse[]> {
    const url = `${this.apiUrl}/general/information/users/all`;
    return this.httpClient.get<any[]>(url, this.getOptions())
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)),
        mergeMap(value => TypeBuilder.basicUsers(value)));
  }

  public basicTechnicianAll(): Observable<BasicUserResponse[]> {
    const url = `${this.apiUrl}/general/information/technicians/all`;
    return this.httpClient.get<any[]>(url, this.getOptions())
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)),
        mergeMap(value => TypeBuilder.basicUsers(value)));
  }
}
