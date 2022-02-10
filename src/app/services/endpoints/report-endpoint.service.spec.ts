import { TestBed } from '@angular/core/testing';

import { ReportEndpointService } from './report-endpoint.service';

describe('ReportEndpointService', () => {
  let service: ReportEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
