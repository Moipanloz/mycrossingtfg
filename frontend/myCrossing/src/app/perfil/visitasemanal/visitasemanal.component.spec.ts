import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasemanalComponent } from './visitasemanal.component';

describe('VisitasemanalComponent', () => {
  let component: VisitasemanalComponent;
  let fixture: ComponentFixture<VisitasemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitasemanalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitasemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
