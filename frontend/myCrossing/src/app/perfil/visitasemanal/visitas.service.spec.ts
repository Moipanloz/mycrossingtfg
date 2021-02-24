import { TestBed } from '@angular/core/testing';

import { VisitasService } from './visitas.service';

describe('VisitasService', () => {
  let service: VisitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
