import { TestBed } from '@angular/core/testing';

import { AnswerEndpointService } from './answer-endpoint.service';

describe('AnswerEndpointService', () => {
  let service: AnswerEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
