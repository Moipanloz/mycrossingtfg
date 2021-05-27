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
  it('should populate', async ()=>{
    let parametrosCreate = new HttpParams()
      .set("testing", 'true');
      expect(await (await http.get("http://localhost/populateDB.php", { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Population done");
  }, 9000);
  it('should create', async () =>{
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
      let res1 = JSON.parse(await (await http.get("http://localhost/visita.php", { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
      expect(res1[0]).toBeFalsy();
      await http.get("http://localhost/visita.php", { params: parametrosCreate, responseType: 'blob' } ).toPromise();
      let res2: Visita[];
      res2 = JSON.parse(await (await http.get("http://localhost/visita.php", { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
      expect(res2).toBeTruthy();
      expect(res2[0].usuario_id.toString()).toEqual('2');
      expect(res2[0].estela.toString()).toEqual('0');
  });
  it('should not create again', async () =>{
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
      let res1 = JSON.parse(await (await http.get("http://localhost/visita.php", { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
      expect(res1[0]).toBeTruthy();
      expect(await (await http.get("http://localhost/visita.php", { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("La visita ya existe");
      let res2: Visita[];
      res2 = JSON.parse(await (await http.get("http://localhost/visita.php", { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
      expect(res2).toBeTruthy();
      expect(res2[0].usuario_id.toString()).toEqual('2');
      expect(res2[0].estela.toString()).toEqual('0');
  });
  it('should not create wrong user', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(9999));
      expect(await (await http.get("http://localhost/visita.php", { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not create wrong verif', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", "fagfufjnhj232")
      .set("userId", JSON.stringify(verificationService.user));
      expect(await (await http.get("http://localhost/visita.php", { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should read', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "read")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(verificationService.user));
      let res: Visita[];
      res = JSON.parse(await (await http.get("http://localhost/visita.php", { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
      expect(res).toBeTruthy();
      expect(res[0].usuario_id.toString()).toEqual('2');
      expect(res[0].estela.toString()).toEqual('0');
  });
  it('should not read wrong user', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "read")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(999));
      expect(await (await http.get("http://localhost/visita.php", { params: parametrosRead, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not read wrong verif', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "read")
        .set("testing", 'true')
        .set("verif", "bgudkjhgsiglsnggelgn24")
        .set("userId", JSON.stringify(verificationService.user));
      expect(await (await http.get("http://localhost/visita.php", { params: parametrosRead, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
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
      await (await http.put("http://localhost/visita.php", visita, { params: parametrosUpdate, responseType: "blob"} ).toPromise()).text();
      let res: Visita[];
      res = await http.get<Visita[]>("http://localhost/visita.php", { params: parametrosRead } ).toPromise();
      expect(res).toBeTruthy();
      expect(res[0]).toBeTruthy();
      expect(res[0].lpa.toString()).toEqual('lpa');
      expect(res[0].lpr.toString()).toEqual('lpr');
      expect(res[0].estela.toString()).toEqual('1');
  });
  it('should not update object from another user', async () =>{
    let visita:Visita = {usuario_id:'1',estela:true,lpa:'lpa',mpa:'mpa',xpa:'xpa',jpa:'jpa',vpa:'vpa',lpr:'lpr',mpr:'mpr',xpr:'xpr',jpr:'jpr',vpr:'vpr',last_update:null};
      let parametrosUpdate = new HttpParams()
        .set("command", "update")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(verificationService.user));
      expect(await (await http.put("http://localhost/visita.php", visita, { params: parametrosUpdate, responseType: "blob"} ).toPromise()).text()).toEqual("Esta visita no le pertenece");
  });
  it('should not update estela null', async () =>{
    let visita:Visita = {usuario_id:'2',estela:null,lpa:'lpa',mpa:'mpa',xpa:'xpa',jpa:'jpa',vpa:'vpa',lpr:'lpr',mpr:'mpr',xpr:'xpr',jpr:'jpr',vpr:'vpr',last_update:null};
      let parametrosUpdate = new HttpParams()
        .set("command", "update")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(verificationService.user));
      expect(await (await http.put("http://localhost/visita.php", visita, { params: parametrosUpdate, responseType: "blob"} ).toPromise()).text()).toEqual("Debe especificar correctamente si estela ha ido de visita");
  });
  it('should not update estela wrong', async () =>{
    let visita = {usuario_id:'2',estela:"buenosDias",lpa:'lpa',mpa:'mpa',xpa:'xpa',jpa:'jpa',vpa:'vpa',lpr:'lpr',mpr:'mpr',xpr:'xpr',jpr:'jpr',vpr:'vpr',last_update:null};
      let parametrosUpdate = new HttpParams()
        .set("command", "update")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(verificationService.user));
      expect(await (await http.put("http://localhost/visita.php", visita, { params: parametrosUpdate, responseType: "blob"} ).toPromise()).text()).toEqual("Debe especificar correctamente si estela ha ido de visita");
  });
  it('should not update wrong user', async () =>{
    let visita:Visita = {usuario_id:'9999',estela:true,lpa:'lpa',mpa:'mpa',xpa:'xpa',jpa:'jpa',vpa:'vpa',lpr:'lpr',mpr:'mpr',xpr:'xpr',jpr:'jpr',vpr:'vpr',last_update:null};
      let parametrosUpdate = new HttpParams()
        .set("command", "update")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(9999));
      expect(await (await http.put("http://localhost/visita.php", visita, { params: parametrosUpdate, responseType: "blob"} ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not update wrong verif', async () =>{
    let visita:Visita = {usuario_id:'2',estela:true,lpa:'lpa',mpa:'mpa',xpa:'xpa',jpa:'jpa',vpa:'vpa',lpr:'lpr',mpr:'mpr',xpr:'xpr',jpr:'jpr',vpr:'vpr',last_update:null};
      let parametrosUpdate = new HttpParams()
        .set("command", "update")
        .set("testing", 'true')
        .set("verif", "fgeuaihfaiohfi23")
        .set("userId", JSON.stringify(verificationService.user));
      expect(await (await http.put("http://localhost/visita.php", visita, { params: parametrosUpdate, responseType: "blob"} ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
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
      await (await http.put("http://localhost/visita.php", visita, { params: parametrosFecha, responseType: "blob"} ).toPromise()).text();
      let res: Visita[];
      res = await http.get<Visita[]>("http://localhost/visita.php", { params: parametrosRead } ).toPromise();
      expect(res).toBeTruthy();
      expect(res[0]).toBeTruthy();
      expect(res[0].lpa.toString()).toEqual('lpa');
      expect(res[0].lpr.toString()).toEqual('lpr');
      expect(res[0].last_update.toString()).toEqual('9999');
      expect(res[0].estela.toString()).toEqual('1');
  });
  it('should not update date from another user', async () =>{
    let visita:Visita = {usuario_id:'1',estela:true,lpa:null,mpa:null,xpa:null,jpa:null,vpa:null,lpr:null,mpr:null,xpr:null,jpr:null,vpr:null,last_update:'9999'};
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
      expect(await (await http.put("http://localhost/visita.php", visita, { params: parametrosFecha, responseType: "blob"} ).toPromise()).text()).toEqual("Esta visita no le pertenece");
  });
  it('should not update date wrong user', async () =>{
    let visita:Visita = {usuario_id:'9999',estela:true,lpa:null,mpa:null,xpa:null,jpa:null,vpa:null,lpr:null,mpr:null,xpr:null,jpr:null,vpr:null,last_update:'9999'};
      let parametrosFecha = new HttpParams()
        .set("command", "set_fecha")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(9999));
        let parametrosRead = new HttpParams()
          .set("command", "read")
          .set("testing", 'true')
          .set("verif", verificationService.verifCode)
          .set("userId", JSON.stringify(verificationService.user));
      expect(await (await http.put("http://localhost/visita.php", visita, { params: parametrosFecha, responseType: "blob"} ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not update date wrong verif', async () =>{
    let visita:Visita = {usuario_id:'2',estela:true,lpa:null,mpa:null,xpa:null,jpa:null,vpa:null,lpr:null,mpr:null,xpr:null,jpr:null,vpr:null,last_update:'9999'};
      let parametrosFecha = new HttpParams()
        .set("command", "set_fecha")
        .set("testing", 'true')
        .set("verif", "faghfuehf242")
        .set("userId", JSON.stringify(verificationService.user));
        let parametrosRead = new HttpParams()
          .set("command", "read")
          .set("testing", 'true')
          .set("verif", verificationService.verifCode)
          .set("userId", JSON.stringify(verificationService.user));
      expect(await (await http.put("http://localhost/visita.php", visita, { params: parametrosFecha, responseType: "blob"} ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
});