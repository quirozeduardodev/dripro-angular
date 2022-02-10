import { TestBed } from '@angular/core/testing';

import { GeneratorEndpointService } from './generator-endpoint.service';

describe('GeneratorEndpointService', () => {
  let service: GeneratorEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratorEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
