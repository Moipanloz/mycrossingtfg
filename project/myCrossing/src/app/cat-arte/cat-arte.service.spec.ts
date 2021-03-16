import { TestBed } from '@angular/core/testing';

import { CatArteService } from './cat-arte.service';

describe('CatArteService', () => {
  let service: CatArteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatArteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
