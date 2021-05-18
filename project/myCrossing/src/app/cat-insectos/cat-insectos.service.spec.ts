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

  beforeAll(async () => {
    console.log("Populating1");
    await TestBed.configureTestingModule({
      providers: [ { provide: VerificationService, useClass: MockVerificationService}, CatInsectosService],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
    console.log("Populating");
    service = TestBed.inject(CatInsectosService);
    console.log("Populating");
    verificationService = TestBed.inject(VerificationService);
    console.log("Populating");
    http = TestBed.inject(HttpClient);
    let parametrosCreate = new HttpParams()
      .set("testing", 'true');
    await http.get("http://localhost/php/populateDB.php", { params: parametrosCreate, responseType: 'blob' } ).toPromise();
  },8000);
  let urlTested = "http://localhost/php/catbichos.php";
  it('should read', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "read")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(verificationService.user));
      let res: Bicho[];
      res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
      expect(res).toBeTruthy();
      expect(res[0].usuario_id.toString()).toEqual('2');
      expect(res[0].nombre_criatura.toString()).toEqual('polillaatlas');
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
    expect(res[0].usuario_id.toString()).toEqual('2');
    expect(res[0].nombre_criatura.toString()).toEqual('TestingCreature');
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
});