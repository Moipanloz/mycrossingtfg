import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatRopaComponent } from './cat-ropa.component';

describe('CatRopaComponent', () => {
  let component: CatRopaComponent;
  let fixture: ComponentFixture<CatRopaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatRopaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatRopaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
