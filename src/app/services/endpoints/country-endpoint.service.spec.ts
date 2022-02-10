import { TestBed } from '@angular/core/testing';

import { CountryEndpointService } from './country-endpoint.service';

describe('CountryEndpointService', () => {
  let service: CountryEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
