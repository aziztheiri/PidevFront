import { TestBed } from '@angular/core/testing';

import { GarantiesService } from './garanties.service';

describe('GarantiesService', () => {
  let service: GarantiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarantiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
