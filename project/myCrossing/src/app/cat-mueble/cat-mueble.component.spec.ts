import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatMuebleComponent } from './cat-mueble.component';

describe('CatMuebleComponent', () => {
  let component: CatMuebleComponent;
  let fixture: ComponentFixture<CatMuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatMuebleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatMuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
