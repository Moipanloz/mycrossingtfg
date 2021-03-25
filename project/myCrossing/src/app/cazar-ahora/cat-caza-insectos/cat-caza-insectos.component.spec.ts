import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCazaInsectosComponent } from './cat-caza-insectos.component';

describe('CatCazaInsectosComponent', () => {
  let component: CatCazaInsectosComponent;
  let fixture: ComponentFixture<CatCazaInsectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatCazaInsectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatCazaInsectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
