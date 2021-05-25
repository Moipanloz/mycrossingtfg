import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Tarea } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

import { TareasService } from './tarea.service';

class MockVerificationService{
  logged = true;
  verifCode = 'verifuser2';
  user = 2;
}

describe('Insectos', () => {
  let service: TareasService;
  let verificationService : VerificationService;
  let http : HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ { provide: VerificationService, useClass: MockVerificationService}, TareasService],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
    service = TestBed.inject(TareasService);
    verificationService = TestBed.inject(VerificationService);
    http = TestBed.inject(HttpClient);
  });
  let urlTested = "http://localhost/php/tarea.php";
  it('should populate', async ()=>{
    let parametrosCreate = new HttpParams()
      .set("testing", 'true');
    expect(await (await http.get("http://localhost/php/populateDB.php", { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Population done");
  }, 9000);
  it('should read', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "read")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(verificationService.user));
      let res: Tarea[];
      res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
      expect(res).toBeTruthy();
      expect(res[0].imagen_url.toString()).toEqual('bolsa-bayas');
      expect(res[1].imagen_url.toString()).toEqual('diy');
      expect(res[2].imagen_url.toString()).toEqual('fosil');
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

    let objectToCreate: Tarea = {hecha: false, id: null, imagen_url: "hierbajos", usuario_id: 2};
    let parametrosRead = new HttpParams()
      .set("command", "read")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise();
    let res: Tarea[];
    res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
    expect(res).toBeTruthy();
    expect(res[3].imagen_url.toString()).toEqual('hierbajos');
  });
  it('should not create for another user', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));

    let tareaToCreate: Tarea = {hecha: false, id: null, imagen_url: "regalo", usuario_id: 4};
    expect(await (await http.post(urlTested, tareaToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("No puedes crear tareas para otro usuario");
  });
  it('should not create wrong user', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(9999));
    let tareaToCreate: Tarea = {hecha: false, id: null, imagen_url: "regalo", usuario_id: 9999};
    expect(await (await http.post(urlTested, tareaToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not create wrong verif', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", "fagfufjnhj232")
      .set("userId", JSON.stringify(verificationService.user));
    let tareaToCreate: Tarea = {hecha: false, id: null, imagen_url: "regalo", usuario_id: 2};
    expect(await (await http.post(urlTested, tareaToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should not create empty object', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    let tareaToCreate: Tarea = {hecha: false, id: null, imagen_url: "", usuario_id: 2};
    expect(await (await http.post(urlTested, tareaToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Imagen incorrecta");
  });
  it('should delete', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("tareaId", "8")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));

    let parametrosRead = new HttpParams()
      .set("command", "read")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text();
    let res: Tarea[];
    res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
    expect(res[4]).toBeFalsy();
  });
  it('should not delete wrong user', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("tareaId", "7")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(9999));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not delete wrong verif', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("tareaId", "7")
      .set("verif", "hbghfauhf24535kgheuhg")
      .set("userId", JSON.stringify(verificationService.user));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should not delete wrong object', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("tareaId", "99999")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe tarea con este id");
  });
  it('should not delete empty object', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("tareaId", "")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe tarea con este id");
  });
  it('should not delete object from another', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("tareaId", "4")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("No eres el dueño de la tarea");
  });
  it('should update', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "update")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));

    let objectToCreate: Tarea = {hecha: false, id: null, imagen_url: "hierbajos", usuario_id: 2};
    let parametrosRead = new HttpParams()
      .set("command", "read")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise();
    let res: Tarea[];
    res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
    expect(res).toBeTruthy();
    expect(res[3].imagen_url.toString()).toEqual('hierbajos');
  });
  it('should not update for another user', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "update")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));

    let tareaToCreate: Tarea = {hecha: false, id: 6, imagen_url: "regalo", usuario_id: 4};
    expect(await (await http.post(urlTested, tareaToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("No eres el dueño de la tarea");
  });
  it('should not update wrong user', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "update")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(9999));
    let tareaToCreate: Tarea = {hecha: false, id: 3, imagen_url: "regalo", usuario_id: 9999};
    expect(await (await http.post(urlTested, tareaToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not update wrong verif', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "update")
      .set("testing", 'true')
      .set("verif", "fagfufjnhj232")
      .set("userId", JSON.stringify(verificationService.user));
    let tareaToCreate: Tarea = {hecha: false, id: 3, imagen_url: "regalo", usuario_id: 2};
    expect(await (await http.post(urlTested, tareaToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should not update empty object', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "update")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    let tareaToCreate: Tarea = {hecha: false, id: 3, imagen_url: "", usuario_id: 2};
    expect(await (await http.post(urlTested, tareaToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Imagen incorrecta");
  });
});