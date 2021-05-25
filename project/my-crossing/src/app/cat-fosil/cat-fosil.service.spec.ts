import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Fosil } from 'app/general/interfaces';
import { VerificationService } from 'app/general/services/verification.service';
import { CookieService } from 'ngx-cookie-service';
import { CatFosilService } from './cat-fosil.service';

describe('CatFosilService', () => {
  //Servicios
  let catFosilService: CatFosilService;
  let httpMock : HttpTestingController;
  let httpClient : HttpClient;
  let cookieService : CookieService;

  //Constantes
  const VERIF_CODE = "verific";
  const USER_ID = 1;
  const FOSIL : Fosil[] = [{
    usuario_id: USER_ID,
    nombre_fosil: "nombre"
  }];
  const READ_PARAMS = new HttpParams()
  .set("command", "read")
  .set("verif", VERIF_CODE)
  .set("userId", JSON.stringify(USER_ID));
  const DELETE_PARAMS = new HttpParams()
    .set("command", "delete")
    .set("nombreFosil", FOSIL[0].nombre_fosil)
    .set("verif", VERIF_CODE)
    .set("userId", JSON.stringify(USER_ID));
  const CREATE_PARAMS = new HttpParams()
  .set("command", "create")
  .set("verif", VERIF_CODE)
  .set("userId", JSON.stringify(USER_ID));
  const verificationStub = {
    verifCode: VERIF_CODE,
    user: USER_ID
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CatFosilService,
        CookieService,
        { provide: VerificationService, useValue: verificationStub }
      ]
    });

    //Injections
    catFosilService = TestBed.inject(CatFosilService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    cookieService = TestBed.inject(CookieService);
  });


  it('Deberia leer los fosiles', () => {
    catFosilService.readFosil().then(fos => {
      expect(fos).toEqual(FOSIL);
    });
    const req = httpMock.expectOne("http://localhost/catfosiles.php?command=read&verif="+VERIF_CODE+"&userId="+USER_ID);
    expect(req.request.method).toEqual("GET");
    expect(req.request.url).toBe("http://localhost/catfosiles.php");
    expect(req.request.params.get("command")).toEqual(READ_PARAMS.get("command"));
    expect(req.request.params.get("verif")).toEqual(READ_PARAMS.get("verif"));
    expect(req.request.params.get("userId")).toEqual(READ_PARAMS.get("userId"));
    req.flush(FOSIL);
    httpMock.verify();
  });

  it('Deberia borrar un fosil', () => {
    catFosilService.borrarFosil(FOSIL[0].nombre_fosil);
    const req = httpMock.expectOne("http://localhost/catfosiles.php?command=delete&nombreFosil=nombre&verif="+VERIF_CODE+"&userId="+USER_ID);
    expect(req.request.method).toEqual("GET");
    expect(req.request.url).toBe("http://localhost/catfosiles.php");
    expect(req.request.params.get("command")).toEqual(DELETE_PARAMS.get("command"));
    expect(req.request.params.get("nombreFosil")).toEqual(DELETE_PARAMS.get("nombreFosil"));
    expect(req.request.params.get("verif")).toEqual(DELETE_PARAMS.get("verif"));
    expect(req.request.params.get("userId")).toEqual(DELETE_PARAMS.get("userId"));
    req.flush(FOSIL);
    httpMock.verify();
  });

  it('Deberia añadir un fosil', () => {
    catFosilService.addFosil(FOSIL[0].nombre_fosil);
    const req = httpMock.expectOne("http://localhost/catfosiles.php?command=create&verif="+VERIF_CODE+"&userId="+USER_ID);
    expect(req.request.method).toEqual("POST");
    expect(req.request.url).toBe("http://localhost/catfosiles.php");
    expect(req.request.params.get("command")).toEqual(CREATE_PARAMS.get("command"));
    expect(req.request.params.get("verif")).toEqual(CREATE_PARAMS.get("verif"));
    expect(req.request.params.get("userId")).toEqual(CREATE_PARAMS.get("userId"));
    req.flush(FOSIL);
    httpMock.verify();
  });

  //Como probar fallos?

  // it('No deberia añadir un fosil porque faltan parametros', () => {
  //   catFosilService.addFosil(FOSIL[0].nombre_fosil).then().catch(err => {
  //     expect(err.message).toBe("Faltan parametros");
  //   });
  //   const req = httpMock.expectOne("http://localhost/catfosiles.php?command=create&verif="+VERIF_CODE+"&userId="+USER_ID);
  //   expect(req.request.method).toEqual("POST");
  //   expect(req.request.url).toBe("http://localhost/catfosiles.php");
  //   expect(req.request.params.get("command")).toEqual(CREATE_PARAMS.get("command"));
  //   expect(req.request.params.get("verif")).toEqual(CREATE_PARAMS.get("verif"));
  //   expect(req.request.params.get("userId")).toEqual(CREATE_PARAMS.get("userId"));
  //   req.flush(FOSIL);
  //   httpMock.verify();
  // });

});
