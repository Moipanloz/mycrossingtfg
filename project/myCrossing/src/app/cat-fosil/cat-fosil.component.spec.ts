import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatFosilComponent } from './cat-fosil.component';

describe('CatFosilComponent', () => {
  let component: CatFosilComponent;
  let fixture: ComponentFixture<CatFosilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatFosilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatFosilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
