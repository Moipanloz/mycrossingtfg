import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColeccionespComponent } from './coleccionesp.component';

describe('ColeccionespComponent', () => {
  let component: ColeccionespComponent;
  let fixture: ComponentFixture<ColeccionespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColeccionespComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColeccionespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
