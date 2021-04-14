import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalEventosComponent } from './cal-eventos.component';

describe('CalEventosComponent', () => {
  let component: CalEventosComponent;
  let fixture: ComponentFixture<CalEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
