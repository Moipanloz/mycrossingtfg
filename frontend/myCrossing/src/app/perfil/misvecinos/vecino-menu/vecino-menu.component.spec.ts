import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VecinoMenuComponent } from './vecino-menu.component';

describe('VecinoMenuComponent', () => {
  let component: VecinoMenuComponent;
  let fixture: ComponentFixture<VecinoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VecinoMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VecinoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
