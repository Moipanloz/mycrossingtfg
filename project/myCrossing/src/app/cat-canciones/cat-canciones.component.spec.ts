import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCancionesComponent } from './cat-canciones.component';

describe('CatCancionesComponent', () => {
  let component: CatCancionesComponent;
  let fixture: ComponentFixture<CatCancionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatCancionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
