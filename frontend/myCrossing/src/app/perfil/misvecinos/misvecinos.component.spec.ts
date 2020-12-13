import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisvecinosComponent } from './misvecinos.component';

describe('MisvecinosComponent', () => {
  let component: MisvecinosComponent;
  let fixture: ComponentFixture<MisvecinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisvecinosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisvecinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
