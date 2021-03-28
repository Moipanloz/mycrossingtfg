import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatVecinosComponent } from './cat-vecinos.component';

describe('CatVecinosComponent', () => {
  let component: CatVecinosComponent;
  let fixture: ComponentFixture<CatVecinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatVecinosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatVecinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
