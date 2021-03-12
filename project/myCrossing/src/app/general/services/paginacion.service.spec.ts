import { TestBed } from '@angular/core/testing';

import { PaginacionService } from './paginacion.service';

describe('PaginacionService', () => {
  let service: PaginacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
