import { TestBed } from '@angular/core/testing';

import { CatInsectosService } from './cat-insectos.service';

describe('CatInsectosService', () => {
  let service: CatInsectosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatInsectosService);
  });
/*
  it('should be created', () => {
    expect(service).toBeTruthy();
  });*/
});
