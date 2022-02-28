import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TypeBuilder } from '../../util/type-builder';
import { ReportFiltersRequest } from '../../types/request/report-filters.request';
import { PaginateResponse } from '../../types/response/paginate.response';
import { BasicReportResponse } from '../../types/response/report.response';
import { CreateReportRequest } from '../../types/request/create-report.request';
import { LocalReport } from 'src/app/database/models/local_report';

@Injectable()
export class ReportEndpointService extends EndpointService {
  constructor(httpClient: HttpClient, authService: AuthService) {
    super(httpClient, authService);
  }

  public pagination(
    filters: ReportFiltersRequest,
    page: number = 1,
    limit: number = 10
  ): Observable<PaginateResponse<BasicReportResponse>> {
    const url = `${this.apiUrl}/formulary/all?page=${page}&type=${filters.type}&order=${filters.shortByDateTime}&limit=${limit}`;
    return this.httpClient.get<any>(url, this.getOptions()).pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err)),
      mergeMap((value) => TypeBuilder.paginate(value, TypeBuilder.basicReports))
    );
  }

  public save(request: CreateReportRequest): Observable<any> {
    const url = `${this.apiUrl}/formulary/store`;
    return this.httpClient.post<any>(url, request, this.getOptions()).pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err)),
      mergeMap((value) => TypeBuilder.paginate(value, TypeBuilder.basicReports))
    );
  }

  public findImageByReportId(id: number): Observable<string[]> {
    const url = `${this.apiUrl}/formulary/images/${id}`;
    return this.httpClient.get<any>(url, this.getOptions()).pipe(
      map((value) => {
        if (value.photos) {
          const photos = value.photos;
          return photos && Array.isArray(photos)
            ? (photos as any[]).filter((value1) => value1)
            : [];
        }
        return [];
      }),
      catchError((err: HttpErrorResponse) => of([]))
    );
  }

  public findAnswers(
    id: number
  ): Observable<{ type: string | null; answers: { [p: string]: any } }> {
    const url = `${this.apiUrl}/formulary/show/${id}`;
    return this.httpClient.get<any>(url, this.getOptions()).pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err)),
      mergeMap((value) => {
        const answers: { [p: string]: any } = value.answer ?? {};
        const type: string = value.type ?? 'unknown';
        if (
          [
            'jsa_sitio',
            'jsa_field_generic',
            'jsa_field_power_gen',
            'jsa_field_marine',
            'warehouse',
          ].includes(type)
        ) {
          return this.findImageByReportId(id).pipe(
            map((photos) => {
              answers.photos = photos;
              return { answers, type };
            })
          );
        } else {
          // service_generic
          // service_maintenance
          // rot_contact_rotary
          // rot_oil_free_sierra
          // hl_eh_hb
          // rot_contact_nirvana
          // rot_oil_free_nirvana
          // refrigerated
          return of({ answers, type });
        }
      })
    );
  }
}
