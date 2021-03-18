import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { VerificationService } from 'app/general/services/verification.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { MisvecinosService } from './misvecinos.service';
import { Vecino } from 'app/general/interfaces';

describe('MisvecinosService', () => {

  //Servicios
  let misVecinosService: MisvecinosService;
  let httpMock : HttpTestingController;
  let httpClient : HttpClient;
  let cookieService : CookieService;

  let verificationStub : any;

  //Constantes
  const VERIF_CODE = "verific";
  const USER_ID = 1;

  beforeEach(() => {

    verificationStub = {
      verifCode: VERIF_CODE,
      user: USER_ID
    }

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MisvecinosService,
        CookieService,
        { provide: VerificationService, useValue: verificationStub }
      ]
    });

    //Injections
    misVecinosService = TestBed.inject(MisvecinosService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    cookieService = TestBed.inject(CookieService);

  });


  it('Deberia leer los vecinos del usuario', () => {
    //Arrange
    let vecino : Vecino[] = [{
      nombre: "nombre",
      vecino_id: "id",
      usuario_id: 1,
      amistad: 1,
      cumple: new Date(),
      personalidad: "personalidad",
      especie: "especie",
      genero: "genero",
      imgIcon: "icon",
      imgPhoto: "photo"
    }];

    //Act
    misVecinosService.readMisVecinos().subscribe(vec => {
      //Assert
      expect(vec).toEqual(vecino);
    });

    const req = httpMock.expectOne("http://localhost/php/misvecinos.php?command=read&verif="+VERIF_CODE+"&userId="+USER_ID);
    expect(req.request.method).toEqual("GET");
    req.flush(vecino);
    httpMock.verify();
  });

});
