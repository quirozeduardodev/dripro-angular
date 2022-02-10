import { TestBed } from '@angular/core/testing';

import { ManualEndpointService } from './manual-endpoint.service';

describe('ManualEndpointService', () => {
  let service: ManualEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
