import { TestBed } from '@angular/core/testing';

import { CategoryEndpointService } from './category-endpoint.service';

describe('CategoryEndpointService', () => {
  let service: CategoryEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
