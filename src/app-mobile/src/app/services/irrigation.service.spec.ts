import { TestBed, inject } from '@angular/core/testing';

import { IrrigationService } from './irrigation.service';

describe('IrrigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IrrigationService]
    });
  });

  it('should be created', inject([IrrigationService], (service: IrrigationService) => {
    expect(service).toBeTruthy();
  }));
});
