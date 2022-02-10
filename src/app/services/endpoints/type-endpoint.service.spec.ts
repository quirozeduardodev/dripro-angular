import { TestBed } from '@angular/core/testing';

import { TypeEndpointService } from './type-endpoint.service';

describe('TypeEndpointService', () => {
  let service: TypeEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
