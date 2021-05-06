import { TestBed } from '@angular/core/testing';

import { CatSuenoService } from './cat-sueno.service';

describe('CatSuenoService', () => {
  let service: CatSuenoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatSuenoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
