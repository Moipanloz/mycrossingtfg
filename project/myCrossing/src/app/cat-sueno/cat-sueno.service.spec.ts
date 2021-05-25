import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Sueno } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';

import { CatSuenoService } from './cat-sueno.service';

class MockVerificationService{
  logged = true;
  verifCode = 'verifuser2';
  user = 2;
}

describe('Sueños', () => {
  let service: CatSuenoService;
  let verificationService : VerificationService;
  let http : HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ { provide: VerificationService, useClass: MockVerificationService}, CatSuenoService],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
    service = TestBed.inject(CatSuenoService);
    verificationService = TestBed.inject(VerificationService);
    http = TestBed.inject(HttpClient);
  });
  let urlTested = "http://localhost/php/catsuenos.php";
  it('should populate', async ()=>{
    let parametrosCreate = new HttpParams()
      .set("testing", 'true');
    expect(await (await http.get("http://localhost/php/populateDB.php", { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Population done");
  }, 9000);
  it('should read', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "read")
        .set("testing", 'true');
      let res: Sueno[];
      res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
      expect(res).toBeTruthy();
      expect(res[0].codigo_sueno.toString()).toEqual('DA-1234-1234-1234');
      expect(res[1].codigo_sueno.toString()).toEqual('DA-1234-1234-1235');
  });
  it('should readMine', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "readMine")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(verificationService.user));
      let res: Sueno[];
      res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
      expect(res).toBeTruthy();
      expect(res[0].codigo_sueno.toString()).toEqual('DA-1234-1234-1235');
  });
  it('should not readMine wrong user', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "readMine")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(999));
      expect(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not readMine wrong verif', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "readMine")
        .set("testing", 'true')
        .set("verif", "bgudkjhgsiglsnggelgn24")
        .set("userId", JSON.stringify(verificationService.user));
      expect(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should exist', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "existe")
        .set("testing", 'true')
        .set("codigo", "DA-1234-1234-1234")
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(verificationService.user));
      let res: boolean;
      res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
      expect(res).toBeTruthy();
      expect(res).toEqual(true);
  });
  it('should not exist wrong user', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "existe")
        .set("testing", 'true')
        .set("codigo", "DA-1234-1234-1234")
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(999));
      expect(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not exist wrong verif', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "existe")
        .set("testing", 'true')
        .set("codigo", "DA-1234-1234-1234")
        .set("verif", "bgudkjhgsiglsnggelgn24")
        .set("userId", JSON.stringify(verificationService.user));
      expect(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should create', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", "verifuser4")
      .set("userId", JSON.stringify(4));

    let objectToCreate: Sueno = {usuario_id: 4, codigo_sueno: "DA-1234-1234-1221", foto1: "https://animalcrossingworld.com/wp-content/uploads/2020/02/animal-crossing-new-horizons-screenshot-na-website-explore-decorating-1-790x444.jpg", foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    let parametrosRead = new HttpParams()
      .set("command", "read")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text();
    let res: Sueno[];
    res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
    expect(res).toBeTruthy();
    expect(res.length).toEqual(4);
    expect(res[3].codigo_sueno.toString()).toEqual('DA-1234-1234-1221');
  });
  it('should not create for another user', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));

    let objectToCreate: Sueno = {usuario_id: 5, codigo_sueno: "DA-1234-1234-1223", foto1: "https://animalcrossingworld.com/wp-content/uploads/2020/02/animal-crossing-new-horizons-screenshot-na-website-explore-decorating-1-790x444.jpg", foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    expect(await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("No puedes modificar en otros usuarios");
  });
  it('should not create wrong user', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(9999));
    let objectToCreate: Sueno = {usuario_id: 5, codigo_sueno: "DA-1234-1234-1223", foto1: "https://animalcrossingworld.com/wp-content/uploads/2020/02/animal-crossing-new-horizons-screenshot-na-website-explore-decorating-1-790x444.jpg", foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    expect(await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not create wrong verif', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", "fagfufjnhj232")
      .set("userId", JSON.stringify(5));
    let objectToCreate: Sueno = {usuario_id: 5, codigo_sueno: "DA-1234-1234-1223", foto1: "https://animalcrossingworld.com/wp-content/uploads/2020/02/animal-crossing-new-horizons-screenshot-na-website-explore-decorating-1-790x444.jpg", foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    expect(await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should not create empty dream code', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(5));
    let objectToCreate: Sueno = {usuario_id: 5, codigo_sueno: null, foto1: "https://animalcrossingworld.com/wp-content/uploads/2020/02/animal-crossing-new-horizons-screenshot-na-website-explore-decorating-1-790x444.jpg", foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    expect(await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("El codigo de sueño no cumple el patrón");
  });
  it('should not create wrong dream code', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(5));
    let objectToCreate: Sueno = {usuario_id: 5, codigo_sueno: "FA-1234-1234-1111", foto1: "https://animalcrossingworld.com/wp-content/uploads/2020/02/animal-crossing-new-horizons-screenshot-na-website-explore-decorating-1-790x444.jpg", foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    expect(await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("El codigo de sueño no cumple el patrón");
  });
  it('should not create empty photo', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "create")
      .set("testing", 'true')
      .set("verif", "verifuser5")
      .set("userId", JSON.stringify(5));
    let objectToCreate: Sueno = {usuario_id: 5, codigo_sueno: "DA-1234-1243-1232", foto1: null, foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    expect(await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Debes seleccionar al menos una foto");
  });
  it('should update', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "update")
      .set("testing", 'true')
      .set("verif", "verifuser4")
      .set("userId", JSON.stringify(4));

    let objectToCreate: Sueno = {usuario_id: 4, codigo_sueno: "DA-1234-1234-1221", foto1: "https://animalcrossingworld.com/wp-content/uploads/2020/02/animal-crossing-new-horizons-screenshot-na-website-explore-decorating-1-790x444.jpg", foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    let parametrosRead = new HttpParams()
      .set("command", "read")
      .set("testing", 'true');
    await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text();
    let res: Sueno[];
    res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
    expect(res).toBeTruthy();
    expect(res.length).toEqual(4);
    expect(res[3].codigo_sueno.toString()).toEqual('DA-1234-1234-1221');
  });
  it('should not update for another user', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "update")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));

    let objectToCreate: Sueno = {usuario_id: 5, codigo_sueno: "DA-1234-1234-1223", foto1: "https://animalcrossingworld.com/wp-content/uploads/2020/02/animal-crossing-new-horizons-screenshot-na-website-explore-decorating-1-790x444.jpg", foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    expect(await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("No puedes modificar en otros usuarios");
  });
  it('should not update when no dream was created', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "update")
      .set("testing", 'true')
      .set("verif", "verifuser5")
      .set("userId", JSON.stringify(5));

    let objectToCreate: Sueno = {usuario_id: 5, codigo_sueno: "DA-1234-1234-1227", foto1: "https://animalcrossingworld.com/wp-content/uploads/2020/02/animal-crossing-new-horizons-screenshot-na-website-explore-decorating-1-790x444.jpg", foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    expect(await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Este usuario no posee un sueno");
  });
  it('should not update wrong user', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "update")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(9999));
    let objectToCreate: Sueno = {usuario_id: 5, codigo_sueno: "DA-1234-1234-1223", foto1: "https://animalcrossingworld.com/wp-content/uploads/2020/02/animal-crossing-new-horizons-screenshot-na-website-explore-decorating-1-790x444.jpg", foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    expect(await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not update wrong verif', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "update")
      .set("testing", 'true')
      .set("verif", "fagfufjnhj232")
      .set("userId", JSON.stringify(4));
    let objectToCreate: Sueno = {usuario_id: 5, codigo_sueno: "DA-1234-1234-1223", foto1: "https://animalcrossingworld.com/wp-content/uploads/2020/02/animal-crossing-new-horizons-screenshot-na-website-explore-decorating-1-790x444.jpg", foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    expect(await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should not update empty dream code', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "update")
      .set("testing", 'true')
      .set("verif", "verifuser4")
      .set("userId", JSON.stringify(4));
    let objectToCreate: Sueno = {usuario_id: 5, codigo_sueno: null, foto1: "https://animalcrossingworld.com/wp-content/uploads/2020/02/animal-crossing-new-horizons-screenshot-na-website-explore-decorating-1-790x444.jpg", foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    expect(await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("El codigo de sueño no cumple el patrón");
  });
  it('should not update wrong dream code', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "update")
      .set("testing", 'true')
      .set("verif", "verifuser4")
      .set("userId", JSON.stringify(4));
    let objectToCreate: Sueno = {usuario_id: 5, codigo_sueno: "FA-1234-1234-1111", foto1: "https://animalcrossingworld.com/wp-content/uploads/2020/02/animal-crossing-new-horizons-screenshot-na-website-explore-decorating-1-790x444.jpg", foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    expect(await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("El codigo de sueño no cumple el patrón");
  });
  it('should not update empty photo', async () =>{
    let parametrosCreate = new HttpParams()
      .set("command", "update")
      .set("testing", 'true')
      .set("verif", "verifuser4")
      .set("userId", JSON.stringify(4));
    let objectToCreate: Sueno = {usuario_id: 5, codigo_sueno: "DA-1234-1243-1232", foto1: null, foto2: null, foto3: null, foto_seleccionada: null, isla: null, likes: null, nombre: null}
    expect(await (await http.post(urlTested, objectToCreate, { params: parametrosCreate, responseType: 'blob' } ).toPromise()).text()).toEqual("Debes seleccionar al menos una foto");
  });
  it('should delete', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("codigoSueno", "DA-1234-1234-1221")
      .set("verif", "verifuser4")
      .set("userId", JSON.stringify(4));

    let parametrosRead = new HttpParams()
      .set("command", "read")
      .set("testing", 'true')
      .set("verif", "verifuser4")
      .set("userId", JSON.stringify(4));
    await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text();
    let res: Sueno[];
    res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
    expect(res[3]).toBeFalsy();
  });
  it('should not delete wrong user', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("codigoSueno", "DA-1234-1234-1235")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(9999));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not delete wrong verif', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("codigoSueno", "DA-1234-1234-1235")
      .set("verif", "hbghfauhf24535kgheuhg")
      .set("userId", JSON.stringify(verificationService.user));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should not delete wrong object', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "delete")
      .set("testing", 'true')
      .set("codigoSueno", "DA-1234-1234-1299")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("No tienes el sueno");
  });
  it('should readMisLikes', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "readMisLikes")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(verificationService.user));
      let res: Sueno[];
      res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
      expect(res).toBeTruthy();
      expect(res.length).toEqual(2);
      expect(res[0].codigo_sueno.toString()).toEqual('DA-1234-1234-1234');
  });
  it('should not readMisLikes wrong user', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "readMisLikes")
        .set("testing", 'true')
        .set("verif", verificationService.verifCode)
        .set("userId", JSON.stringify(999));
      expect(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not readMisLikes wrong verif', async () =>{
      let parametrosRead = new HttpParams()
        .set("command", "readMisLikes")
        .set("testing", 'true')
        .set("verif", "bgudkjhgsiglsnggelgn24")
        .set("userId", JSON.stringify(verificationService.user));
      expect(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should createLike', async () =>{
    let parametrosLikes = new HttpParams()
      .set("command", "creaLike")
      .set("testing", 'true')
      .set("codigoSueno", "DA-1234-1234-1236")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));

    let parametrosRead = new HttpParams()
      .set("command", "readMisLikes")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    await (await http.get(urlTested, { params: parametrosLikes, responseType: 'blob' } ).toPromise()).text();
    let res: String[];
    res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
    expect(res[2]).toBeTruthy();
  });
  it('should not createLike wrong user', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "creaLike")
      .set("testing", 'true')
      .set("codigoSueno", "DA-1234-1234-1235")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(9999));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not createLike wrong verif', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "creaLike")
      .set("testing", 'true')
      .set("codigoSueno", "DA-1234-1234-1235")
      .set("verif", "hbghfauhf24535kgheuhg")
      .set("userId", JSON.stringify(verificationService.user));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should not createLike wrong object', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "creaLike")
      .set("testing", 'true')
      .set("codigoSueno", "DA-1234-1234-1299")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe este codigo");
  });
  it('should deleteLike', async () =>{
    let parametrosLikes = new HttpParams()
      .set("command", "deleteLike")
      .set("testing", 'true')
      .set("codigoSueno", "DA-1234-1234-1234")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));

    let parametrosRead = new HttpParams()
      .set("command", "readMisLikes")
      .set("testing", 'true')
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    await (await http.get(urlTested, { params: parametrosLikes, responseType: 'blob' } ).toPromise()).text();
    let res: Sueno[];
    res = JSON.parse(await (await http.get(urlTested, { params: parametrosRead, responseType: 'blob' } ).toPromise()).text());
    expect(res[2]).toBeFalsy();
  });
  it('should not deleteLike wrong user', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "deleteLike")
      .set("testing", 'true')
      .set("codigoSueno", "DA-1234-1234-1235")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(9999));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe el usuario");
  });
  it('should not deleteLike wrong verif', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "deleteLike")
      .set("testing", 'true')
      .set("codigoSueno", "DA-1234-1234-1235")
      .set("verif", "hbghfauhf24535kgheuhg")
      .set("userId", JSON.stringify(verificationService.user));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("Código de verificacion incorrecto");
  });
  it('should not deleteLike wrong object', async () =>{
    let parametrosDelete = new HttpParams()
      .set("command", "deleteLike")
      .set("testing", 'true')
      .set("codigoSueno", "DA-1234-1234-1299")
      .set("verif", verificationService.verifCode)
      .set("userId", JSON.stringify(verificationService.user));
    expect(await (await http.get(urlTested, { params: parametrosDelete, responseType: 'blob' } ).toPromise()).text()).toEqual("No existe este like");
  });
});