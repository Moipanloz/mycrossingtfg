import { TestBed } from '@angular/core/testing';

import { CatFosilService } from './cat-fosil.service';

describe('CatFosilService', () => {
  let service: CatFosilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatFosilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
