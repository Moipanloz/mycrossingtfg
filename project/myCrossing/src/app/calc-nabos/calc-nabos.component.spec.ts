import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcNabosComponent } from './calc-nabos.component';

describe('CalcNabosComponent', () => {
  let component: CalcNabosComponent;
  let fixture: ComponentFixture<CalcNabosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcNabosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcNabosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
