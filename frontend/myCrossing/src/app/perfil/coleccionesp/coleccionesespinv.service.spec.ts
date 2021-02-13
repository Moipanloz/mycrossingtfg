import { TestBed } from '@angular/core/testing';

import { ColeccionesespinvService } from './coleccionesespinv.service';

describe('ColeccionesespinvService', () => {
  let service: ColeccionesespinvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColeccionesespinvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
