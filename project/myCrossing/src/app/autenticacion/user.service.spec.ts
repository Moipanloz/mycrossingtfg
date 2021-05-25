import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { User } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';
import { CookieService } from 'ngx-cookie-service';

import { UserService } from './user.service';

class MockVerificationService{
  logged = true;
  verifCode = 'verifuser2';
  user = 2;
}

class MockCookieService{}

describe('Authentication', () => {
  let service: UserService;
  let verificationService : VerificationService;
  let http : HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ { provide: VerificationService, useClass: MockVerificationService}, { provide: CookieService, useClass: MockCookieService}, UserService],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
    service = TestBed.inject(UserService);
    verificationService = TestBed.inject(VerificationService);
    http = TestBed.inject(HttpClient);
  });
  let urlTested = "http://localhost/php/authentication.php";
  it('should populate', async ()=>{
    let parametrosCreate = new HttpParams()
      .set("testing", 'true');
    expect(await (await http.get("http://localhost/php/populateDB.php", { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Population done");
  }, 9000);
  it('should logout', async () =>{
    let parametrosAction = new HttpParams()
      .set("verif", "verifuser1")
      .set("userId", JSON.stringify(1))
      .set("command", "logout")
      .set("testing", 'true');
    expect(await (await http.get(urlTested, { params: parametrosAction, responseType: 'blob' } ).toPromise()).text()).toEqual("");
    let parametrosGetKey = new HttpParams()
      .set("verif", "verifuser1")
      .set("userId", JSON.stringify(1))
      .set("command", "getKey")
      .set("testing", 'true');
    expect(await http.get(urlTested, { params: parametrosGetKey } ).toPromise()).toEqual("Codigo de verificacion incorrecto, Error");
  });
  it('should not logout wrong user', async () =>{
    let parametrosAction = new HttpParams()
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(9999))
      .set("command", "logout")
      .set("testing", 'true');
    expect(await (await http.get(urlTested, { params: parametrosAction, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not logout wrong verif', async () =>{
    let parametrosAction = new HttpParams()
      .set("verif", "fwahdjkhnfjafl")
      .set("userId", JSON.stringify(verificationService.user))
      .set("command", "logout")
      .set("testing", 'true');
    expect(await http.get(urlTested, { params: parametrosAction} ).toPromise()).toEqual("Codigo de verificacion incorrecto, Error");
  });
  it('should login', async () =>{
    let parametrosAction = new HttpParams()
      .set("command", "login")
      .set("testing", 'true');
      let user = {clave: "usuario1", email: "usuario1@gmail.com", key: "verifuser1"}
    let res = JSON.parse(await (await http.post(urlTested, user, { params: parametrosAction, responseType: 'blob' } ).toPromise()).text());
    expect(res).toBeTruthy();
    expect(res["verification"]).toEqual("verifuser1");
  });
  it('should not login wrong user', async () =>{
    let parametrosAction = new HttpParams()
      .set("command", "login")
      .set("testing", 'true');
      let user = {clave: "usuario1", email: "usuario9999@gmail.com", key: "verifuser1"}
    let res = await (await http.post(urlTested, user, { params: parametrosAction, responseType: 'blob' } ).toPromise()).text();
    expect(res).toEqual("No existe un usuario con ese email");
  });
  it('should not login wrong pass', async () =>{
    let parametrosAction = new HttpParams()
      .set("command", "login")
      .set("testing", 'true');
      let user = {clave: "usuario999999", email: "usuario1@gmail.com", key: "verifuser1"}
    let res = await (await http.post(urlTested, user, { params: parametrosAction, responseType: 'blob' } ).toPromise()).text();
    expect(res).toEqual("Usuario o contraseña incorrectos");
  });
  it('should read', async () =>{
    let parametrosAction = new HttpParams()
      .set("userId", JSON.stringify(verificationService.user))
      .set("verif", verificationService.verifCode)
      .set("command", "read")
      .set("testing", 'true');
    let res = JSON.parse(await (await http.get(urlTested, { params: parametrosAction, responseType: 'blob' } ).toPromise()).text());
    expect(res).toBeTruthy();
    expect(res[0]["nombre"]).toEqual("usuario2");
  });
  it('should not read wrong user', async () =>{
    let parametrosAction = new HttpParams()
      .set("userId", JSON.stringify(9999))
      .set("verif", verificationService.verifCode)
      .set("command", "read")
      .set("testing", 'true');
    let res = await (await http.get(urlTested, { params: parametrosAction, responseType: 'blob' } ).toPromise()).text();
    expect(res).toBeTruthy();
    expect(res).toEqual("No existe el usuario");
  });
  it('should not read wrong user', async () =>{
    let parametrosAction = new HttpParams()
      .set("userId", JSON.stringify(verificationService.user))
      .set("verif", "fgakfghkjhafjk")
      .set("command", "read")
      .set("testing", 'true');
    let res = JSON.parse(await (await http.get(urlTested, { params: parametrosAction, responseType: 'blob' } ).toPromise()).text());
    expect(res).toBeTruthy();
    expect(res).toEqual("Codigo de verificacion incorrecto, Error");
  });
  it('should getKey', async () =>{
    let parametrosAction = new HttpParams()
      .set("userId", JSON.stringify(verificationService.user))
      .set("verif", verificationService.verifCode)
      .set("command", "getKey")
      .set("testing", 'true');
    let res = JSON.parse(await (await http.get(urlTested, { params: parametrosAction, responseType: 'blob' } ).toPromise()).text());
    expect(res).toBeTruthy();
    expect(res[0]["nombre"]).toEqual("usuario2");
  });
  it('should not getKey wrong user', async () =>{
    let parametrosAction = new HttpParams()
      .set("userId", JSON.stringify(9999))
      .set("verif", verificationService.verifCode)
      .set("command", "getKey")
      .set("testing", 'true');
    let res = await (await http.get(urlTested, { params: parametrosAction, responseType: 'blob' } ).toPromise()).text();
    expect(res).toBeTruthy();
    expect(res).toEqual("No existe el usuario");
  });
  it('should not getKey wrong user', async () =>{
    let parametrosAction = new HttpParams()
      .set("userId", JSON.stringify(verificationService.user))
      .set("verif", "fgakfghkjhafjk")
      .set("command", "getKey")
      .set("testing", 'true');
    let res = JSON.parse(await (await http.get(urlTested, { params: parametrosAction, responseType: 'blob' } ).toPromise()).text());
    expect(res).toBeTruthy();
    expect(res).toEqual("Codigo de verificacion incorrecto, Error");
  });
  it('should register', async () =>{
    let parametrosAction = new HttpParams()
      .set("command", "register")
      .set("testing", 'true');
    let user = {clave: "usuarioNuevo", nombre: "usuarioNuevo", isla:"usuarioNuevo", fruta: "MANZANA", cumpleanyos: Date(), email: "usuarionuevo@gmail.com", hemisferio: "NORTE", verif: "verifusernuevo"}
    let res = JSON.parse(await (await http.post(urlTested, user, { params: parametrosAction, responseType: 'blob' } ).toPromise()).text());
    expect(res).toBeTruthy();
    expect(res[0]["verification"]).toEqual("verifusernuevo");
    expect(res[0]["nombre"]).toEqual("usuarioNuevo");
  });
  it('should not register again', async () =>{
    let parametrosAction = new HttpParams()
      .set("command", "register")
      .set("testing", 'true');
    let user = {clave: "usuarioNuevo", nombre: "usuarioNuevo", isla:"usuarioNuevo", fruta: "MANZANA", cumpleanyos: Date(), email: "usuarionuevo@gmail.com", hemisferio: "NORTE", verif: "verifusernuevo"}
    let res = await (await http.post(urlTested, user, { params: parametrosAction, responseType: 'blob' } ).toPromise()).text();
    expect(res).toBeTruthy();
    expect(res).toEqual("Email ya en uso");
  });
});