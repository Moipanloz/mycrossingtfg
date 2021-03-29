import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { CatFosilComponent } from './cat-fosil.component';
import { CatFosilService } from './cat-fosil.service';

describe('CatFosilComponent', () => {
  //Servicios
  let catFosilService: CatFosilService;
  let cookieService : CookieService;
  let catFosilComponent: CatFosilComponent;
  let fixture: ComponentFixture<CatFosilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatFosilComponent ],
      providers: [
        CatFosilService,
        CookieService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatFosilComponent);
    catFosilService = TestBed.inject(CatFosilService);
    cookieService = TestBed.inject(CookieService);

    catFosilComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia ', () => {
    expect(catFosilComponent).toBeTruthy();
  });
});
