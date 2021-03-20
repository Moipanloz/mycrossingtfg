import { TestBed } from '@angular/core/testing';

import { CatPecesService } from './cat-peces.service';

describe('CatPecesService', () => {
  let service: CatPecesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatPecesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
