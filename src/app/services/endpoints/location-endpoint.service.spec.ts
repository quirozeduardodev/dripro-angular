import { TestBed } from '@angular/core/testing';

import { LocationEndpointService } from './location-endpoint.service';

describe('LocationEndpointService', () => {
  let service: LocationEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
