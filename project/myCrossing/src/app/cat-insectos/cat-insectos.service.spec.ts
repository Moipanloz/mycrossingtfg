import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Bicho } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

import { CatInsectosService } from './cat-insectos.service';

class MockVerificationService{
  logged = true;
  verifCode = 'verifuser2';
  user = 2;
}

describe('Insectos', () => {
  let service: CatInsectosService;
  let verificationService : VerificationService;
  let http : HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ { provide: VerificationService, useClass: MockVerificationService}, CatInsectosService],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
    service = TestBed.inject(CatInsectosService);
    verificationService = TestBed.inject(VerificationService);
    http = TestBed.inject(HttpClient);
  });
  let urlTested = "http://localhost/php/catbichos.php";
  it('should populate', async ()=>{
    let parametrosCreate = new HttpParams()
      .set("testing", 'true');
    expect(await (await http.get("http://localhost/php/populateDB.php", { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Population done");
  }, 8000);
  it('should read', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "read")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(verificationService.user));
      let res: Bicho[];
      res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
      expect(res).toBeTruthy();
      expect(res[0].nombre_criatura.toString()).toEqual('polillaatlas');
      expect(res[1].nombre_criatura.toString()).toEqual('polillacrepuscular');
  });
  it('should not read wrong user', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "read")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(999));
      expect(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not read wrong verif', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "read")
        .set("testing", 'true')
        .set("verif", "bgudkjhgsiglsnggelgn24")
        .set("userId", JSON.stringify(verificationService.user));
      expect(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should create', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));

    let insectToCreate: Bicho = {nombre_criatura: 'TestingCreature', usuario_id: 2}
    let parametrosRead = new HttpParams()
      .set("command", "read")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    await http.post(urlTested, insectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise();
    let res: Bicho[];
    res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
    expect(res).toBeTruthy();
    expect(res[2].nombre_criatura.toString()).toEqual('TestingCreature');
  });
  it('should not create for another user', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));

    let insectToCreate: Bicho = {nombre_criatura: 'CreatureToNotCreate', usuario_id: 1}
    expect(await (await http.post(urlTested, insectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("No puedes crear en otros usuarios");
  });
  it('should not create again same object', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));

    let insectToCreate: Bicho = {nombre_criatura: 'TestingCreature', usuario_id: 2}
    expect(await (await http.post(urlTested, insectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Tienes el bicho");
  });
  it('should not create wrong user', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(9999));
    let insectToCreate: Bicho = {nombre_criatura: 'TestingCreature', usuario_id: 2}
    expect(await (await http.post(urlTested, insectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not create wrong verif', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", "fagfufjnhj232")
      .set("userId", JSON.stringify(verificationService.user));
    let insectToCreate: Bicho = {nombre_criatura: 'TestingCreature', usuario_id: 2}
    expect(await (await http.post(urlTested, insectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should not create empty object', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    let insectToCreate: Bicho = {nombre_criatura: '', usuario_id: 2}
    expect(await (await http.post(urlTested, insectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Introduzca una criatura válida");
  });
  it('should delete', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("nombreCriatura", "TestingCreature")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));

    let parametrosRead = new HttpParams()
      .set("command", "read")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text();
    let res: Bicho[];
    res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
    expect(res[2]).toBeFalsy();
  });
  it('should not delete wrong user', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("nombreCriatura", "TestingCreature")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(9999));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not delete wrong verif', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("nombreCriatura", "TestingCreature")
      .set("verif", "hbghfauhf24535kgheuhg")
      .set("userId", JSON.stringify(verificationService.user));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should not delete wrong object', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("nombreCriatura", "FakeCreature")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("No tienes el bicho");
  });
  it('should not delete empty object', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("nombreCriatura", "")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("Introduzca una criatura válida");
  });
});