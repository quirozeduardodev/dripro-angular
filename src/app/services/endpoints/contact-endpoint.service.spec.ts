import { TestBed } from '@angular/core/testing';

import { ContactEndpointService } from './contact-endpoint.service';

describe('ContactEndpointService', () => {
  let service: ContactEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
