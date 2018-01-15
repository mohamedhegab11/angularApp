import { TestBed, inject } from '@angular/core/testing';

import { AddtionalDataService } from './addtional-data.service';

describe('AddtionalDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddtionalDataService]
    });
  });

  it('should be created', inject([AddtionalDataService], (service: AddtionalDataService) => {
    expect(service).toBeTruthy();
  }));
});
