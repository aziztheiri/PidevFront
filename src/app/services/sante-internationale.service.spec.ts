import { TestBed } from '@angular/core/testing';

import { SanteInternationaleService } from './sante-internationale.service';

describe('SanteInternationaleService', () => {
  let service: SanteInternationaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanteInternationaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
