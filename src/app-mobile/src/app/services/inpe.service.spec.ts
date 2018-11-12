import { TestBed, inject } from '@angular/core/testing';

import { InpeService } from './inpe.service';

describe('InpeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InpeService]
    });
  });

  it('should be created', inject([InpeService], (service: InpeService) => {
    expect(service).toBeTruthy();
  }));
});
