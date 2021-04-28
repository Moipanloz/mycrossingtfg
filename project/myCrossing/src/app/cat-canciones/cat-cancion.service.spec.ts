import { TestBed } from '@angular/core/testing';

import { CatCancionService } from './cat-cancion.service';

describe('CatCancionService', () => {
  let service: CatCancionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatCancionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
