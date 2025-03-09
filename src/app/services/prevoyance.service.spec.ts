import { TestBed } from '@angular/core/testing';

import { PrevoyanceService } from './prevoyance.service';

describe('PrevoyanceService', () => {
  let service: PrevoyanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrevoyanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
