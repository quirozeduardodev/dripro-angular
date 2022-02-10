import { Injectable } from '@angular/core';
import {EndpointService} from "./endpoint.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Observable} from "rxjs";
import {catchError, mergeMap} from "rxjs/operators";
import {TypeBuilder} from "../../util/type-builder";
import {CountryResponse} from "../../types/response/country.response";

@Injectable()
export class CountryEndpointService extends EndpointService {

  constructor(httpClient: HttpClient, authService: AuthService) {
    super(httpClient, authService);
  }

  public all(): Observable<CountryResponse[]> {
    const url = `${this.apiUrl}/general/information/countries/all`;
    return this.httpClient.get<any[]>(url, this.getOptions())
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)),
        mergeMap(value => TypeBuilder.countries(value)));
  }
}
