import { TestBed } from '@angular/core/testing';

import { UnitEndpointService } from './unit-endpoint.service';

describe('UnitEndpointService', () => {
  let service: UnitEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
