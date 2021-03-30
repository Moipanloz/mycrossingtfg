import { TestBed } from '@angular/core/testing';
import { VerificationService } from 'app/general/services/verification.service';

import { CatVecinosComponent } from './cat-vecinos.component';
class MockVerificationService{
  logged = false;
  async verify(){}
}
describe('CatVecinosComponent', () => {
  let component : CatVecinosComponent;
  let verificationService : VerificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ CatVecinosComponent, { provide: VerificationService, useClass: MockVerificationService} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    component = TestBed.inject(CatVecinosComponent);
    verificationService = TestBed.inject(VerificationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter by gen', () => {
    expect(component.filtroAcGen).toBeFalsy();
    component.filtraGen('f');
    expect(component.filtroAcGen).toEqual('f');
  });

  it('should filter by personality', () => {
    expect(component.filtroAcPersonalidad).toBeFalsy();
    component.filtraPersonalidad('Cranky');
    expect(component.filtroAcPersonalidad).toEqual('Cranky');
  });

  it('should have list', async () => {
    await component.ngOnInit();
    expect(component.listaVillagers.length).not.toBe(0);
  });

  it('should transform date', () => {
    expect(component.mesToString('1/1')).toBe('1 de Febrero');
  });
});
