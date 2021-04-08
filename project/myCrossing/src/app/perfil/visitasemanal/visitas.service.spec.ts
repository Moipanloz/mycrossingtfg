import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Visita } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

import { VisitasService } from './visitas.service';

class MockVerificationService{
  logged = true;
  verifCode = 'verifuser2';
  user = 2;
}

describe('Visitas', () => {
  let service: VisitasService;
  let verificationService : VerificationService;
  let http : HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ { provide: VerificationService, useClass: MockVerificationService}, VisitasService],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
    service = TestBed.inject(VisitasService);
    verificationService = TestBed.inject(VerificationService);
    http = TestBed.inject(HttpClient);
  });
  beforeAll( async () => {
    await TestBed.configureTestingModule({
      providers: [ { provide: VerificationService, useClass: MockVerificationService}, VisitasService],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
    service = TestBed.inject(VisitasService);
    verificationService = TestBed.inject(VerificationService);
    http = TestBed.inject(HttpClient);

    let parametrosCreate = new HttpParams()
      .set("testing", 'true');
    await http.get("http://localhost/php/populateDB.php", { params: parametrosCreate, responseType: 'blob' } ).toPromise();
  });
  it('should read', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
      let parametrosRead = new HttpParams()
        .set("command", "read")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(verificationService.user));
      await http.get("http://localhost/php/visita.php", { params: parametrosCreate, responseType: 'blob' } ).toPromise();
      let res: Visita[];
      res = JSON.parse(await (await http.get("http://localhost/php/visita.php", { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
      expect(res).toBeTruthy();
      expect(res[0].usuario_id.toString()).toEqual('2');
      expect(res[0].estela.toString()).toEqual('0');
  });
  it('should update', async () =>{
    let visita:Visita = {usuario_id:'2',estela:true,lpa:'lpa',mpa:'mpa',xpa:'xpa',jpa:'jpa',vpa:'vpa',lpr:'lpr',mpr:'mpr',xpr:'xpr',jpr:'jpr',vpr:'vpr',last_update:null};
      let parametrosUpdate = new HttpParams()
        .set("command", "update")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(verificationService.user));
        let parametrosRead = new HttpParams()
          .set("command", "read")
          .set("testing", 'true')
          .set("verif", verificationService.verifCode)
          .set("userId", JSON.stringify(verificationService.user));
      await (await http.put("http://localhost/php/visita.php", visita, { params: parametrosUpdate, responseType: "blob"} ).toPromise()).text();
      let res: Visita[];
      res = await http.get<Visita[]>("http://localhost/php/visita.php", { params: parametrosRead } ).toPromise();
      expect(res).toBeTruthy();
      expect(res[0].lpa.toString()).toEqual('lpa');
      expect(res[0].lpr.toString()).toEqual('lpr');
      expect(res[0].estela.toString()).toEqual('1');
  });
  it('should update date', async () =>{
    let visita:Visita = {usuario_id:'2',estela:true,lpa:null,mpa:null,xpa:null,jpa:null,vpa:null,lpr:null,mpr:null,xpr:null,jpr:null,vpr:null,last_update:'9999'};
      let parametrosFecha = new HttpParams()
        .set("command", "set_fecha")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(verificationService.user));
        let parametrosRead = new HttpParams()
          .set("command", "read")
          .set("testing", 'true')
          .set("verif", verificationService.verifCode)
          .set("userId", JSON.stringify(verificationService.user));
      await (await http.put("http://localhost/php/visita.php", visita, { params: parametrosFecha, responseType: "blob"} ).toPromise()).text();
      let res: Visita[];
      res = await http.get<Visita[]>("http://localhost/php/visita.php", { params: parametrosRead } ).toPromise();
      expect(res).toBeTruthy();
      expect(res[0].lpa.toString()).toEqual('lpa');
      expect(res[0].lpr.toString()).toEqual('lpr');
      expect(res[0].last_update.toString()).toEqual('9999');
      expect(res[0].estela.toString()).toEqual('1');
  });
});