import { TestBed, inject } from '@angular/core/testing';

import { PagerService } from './pager-service.service';

describe('PagerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagerService]
    });
  });

  it('should be created', inject([PagerService], (service: PagerService) => {
    expect(service).toBeTruthy();
  }));
});
