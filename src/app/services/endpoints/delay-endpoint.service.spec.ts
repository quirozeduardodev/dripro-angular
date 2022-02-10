import { TestBed } from '@angular/core/testing';

import { DelayEndpointService } from './delay-endpoint.service';

describe('DelayEndpointService', () => {
  let service: DelayEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelayEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
