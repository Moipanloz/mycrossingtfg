import { HttpClient, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Visita } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';
import { Observable } from 'rxjs';

import { VisitasService } from './visitas.service';


class MockVerificationService{
  logged = true;
  verifCode = 'soyunverifcode';
  user = 4;
}
class MockHttpService{
  lista : Visita[] = [{usuario_id: '4', lpa: 'VecinoLunesPa', mpa: 'VecinoMartesPa', xpa: 'VecinoMiercolesPa',
  jpa: 'VecinoJuevesPa',vpa: 'VecinoViernesPa', lpr: 'VecinoLunesPr', mpr: 'VecinoMartesPr',
  xpr: 'VecinoMiercolesPr', jpr: 'VecinoJuevesPr', vpr: 'VecinoViernesPr',
  estela: false, last_update: '0'}];
  get(url : string, params : any) : Observable<Visita[]>{
    if(url=='http://localhost/php/visita.php'){
      if(params['params'].get('command')=='read'){
        if(params['params'].get('verif')=='soyunverifcode' && params['params'].get('userId')=='4')
        var res : Visita[] = this.lista;
        return new Observable((observer) => { observer.next(res); observer.complete() } );
      }
    }
  }
  put(url : string, visita : Visita, params : any) : Observable<any>{
    if(url=='http://localhost/php/visita.php'){
      if(params['params'].get('command')=='update'){
        if(params['params'].get('verif')=='soyunverifcode' && params['params'].get('userId')=='4'){
          visita.usuario_id='4';
          visita.last_update='0';
          this.lista = [visita];
          return new Observable((observer) => { observer.next(visita); observer.complete() } );
        }
      }else if(params['params'].get('command')=='create'){
        if(params['params'].get('verif')=='soyunverifcode' && params['params'].get('userId')=='4'){
          this.lista.push({usuario_id: '4', lpa: null, mpa: null, xpa: null, jpa: null,
          vpa: null, lpr: null, mpr: null, xpr: null,
          jpr: null, vpr: null, estela: null, last_update: '0'});
          return new Observable((observer) => { observer.next(visita); observer.complete() });
        }
      }
    }
  }
}

describe('VisitasService', () => {
  let service: VisitasService;
  let verificationService : VerificationService;
  let http : HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ VisitasService, { provide: VerificationService, useClass: MockVerificationService}, { provide: HttpClient, useClass: MockHttpService} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(VisitasService);
    verificationService = TestBed.inject(VerificationService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should read', async () => {
    expect(await service.readVisitas()).toEqual([{
      usuario_id: '4', lpa: 'VecinoLunesPa', mpa: 'VecinoMartesPa', xpa: 'VecinoMiercolesPa', jpa: 'VecinoJuevesPa',
      vpa: 'VecinoViernesPa', lpr: 'VecinoLunesPr', mpr: 'VecinoMartesPr', xpr: 'VecinoMiercolesPr',
      jpr: 'VecinoJuevesPr', vpr: 'VecinoViernesPr', estela: false, last_update: '0'}]);
  });

  it('should update', async () => {
    expect(await service.readVisitas()).toEqual([{
      usuario_id: '4', lpa: 'VecinoLunesPa', mpa: 'VecinoMartesPa', xpa: 'VecinoMiercolesPa', jpa: 'VecinoJuevesPa',
      vpa: 'VecinoViernesPa', lpr: 'VecinoLunesPr', mpr: 'VecinoMartesPr', xpr: 'VecinoMiercolesPr',
      jpr: 'VecinoJuevesPr', vpr: 'VecinoViernesPr', estela: false, last_update: '0'}], "Antes de actualizar");
    service.updateVisitas('VecinoLunesPaActualizado', 'VecinoMartesPa', 'VecinoMiercolesPa', 'VecinoJuevesPa',
    'VecinoViernesPa', 'VecinoLunesPr', 'VecinoMartesPr', 'VecinoMiercolesPr',
    'VecinoJuevesPr', 'VecinoViernesPr', false);
    expect(await service.readVisitas()).toEqual([{
      usuario_id: '4', lpa: 'VecinoLunesPaActualizado', mpa: 'VecinoMartesPa', xpa: 'VecinoMiercolesPa', jpa: 'VecinoJuevesPa',
      vpa: 'VecinoViernesPa', lpr: 'VecinoLunesPr', mpr: 'VecinoMartesPr', xpr: 'VecinoMiercolesPr',
      jpr: 'VecinoJuevesPr', vpr: 'VecinoViernesPr', estela: false, last_update: '0'}], "Tras actualizar");
    
  });

  it('should create', async () => {
    expect(await service.readVisitas()).toEqual([{
      usuario_id: '4', lpa: 'VecinoLunesPa', mpa: 'VecinoMartesPa', xpa: 'VecinoMiercolesPa', jpa: 'VecinoJuevesPa',
      vpa: 'VecinoViernesPa', lpr: 'VecinoLunesPr', mpr: 'VecinoMartesPr', xpr: 'VecinoMiercolesPr',
      jpr: 'VecinoJuevesPr', vpr: 'VecinoViernesPr', estela: false, last_update: '0'}], "Antes de crear");
    service.createVisita();
    expect(await service.readVisitas()).toEqual([{
      usuario_id: '4', lpa: 'VecinoLunesPa', mpa: 'VecinoMartesPa', xpa: 'VecinoMiercolesPa', jpa: 'VecinoJuevesPa',
      vpa: 'VecinoViernesPa', lpr: 'VecinoLunesPr', mpr: 'VecinoMartesPr', xpr: 'VecinoMiercolesPr',
      jpr: 'VecinoJuevesPr', vpr: 'VecinoViernesPr', estela: false, last_update: '0'},
      {usuario_id: '4', lpa: null, mpa: null, xpa: null, jpa: null,
          vpa: null, lpr: null, mpr: null, xpr: null,
          jpr: null, vpr: null, estela: null, last_update: '0'}], "Tras crear");
    
  });
});
