import { TestBed } from '@angular/core/testing';

import { QTAEndpointService } from './qta-endpoint.service';

describe('QTAEndpointService', () => {
  let service: QTAEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QTAEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
