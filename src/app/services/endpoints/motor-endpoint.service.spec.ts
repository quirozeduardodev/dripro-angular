import { TestBed } from '@angular/core/testing';

import { MotorEndpointService } from './motor-endpoint.service';

describe('MotorEndpointService', () => {
  let service: MotorEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotorEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
