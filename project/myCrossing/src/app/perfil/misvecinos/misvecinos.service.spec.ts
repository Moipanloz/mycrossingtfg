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
  let _verif : jasmine.SpyObj<VerificationService>;
  let httpMock : HttpTestingController;
  let httpClient : HttpClient;
  let cookieService : CookieService;

  //Constantes
  const verifSpy = jasmine.createSpyObj('VerificationService', ['verifCode', 'user']);
  const VERIF_CODE = "verific";
  const USER_ID = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MisvecinosService,
        CookieService
      ]
    });

    //Injections
    misVecinosService = TestBed.inject(MisvecinosService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    cookieService = TestBed.inject(CookieService);

    //Mocks

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

    verifSpy.verifCode.and.returnValue(VERIF_CODE);
    verifSpy.user.and.returnValue(USER_ID);

    //Act
    misVecinosService.readMisVecinos().subscribe(vec => {
      //Assert
      expect(vec).toEqual(vecino);
    });

    const req = httpMock.expectOne("http://localhost/php/misvecinos.php?command=read&verif=verific&userId=1");
    expect(req.request.method).toEqual("GET");
    req.flush(vecino);
    httpMock.verify();
  });

});
