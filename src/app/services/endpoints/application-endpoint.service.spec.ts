import { TestBed } from '@angular/core/testing';

import { ApplicationEndpointService } from './application-endpoint.service';

describe('ApplicationEndpointService', () => {
  let service: ApplicationEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
