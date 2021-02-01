import { TestBed } from '@angular/core/testing';

import { MisvecinosService } from './misvecinos.service';

describe('MisvecinosService', () => {
  let service: MisvecinosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisvecinosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
