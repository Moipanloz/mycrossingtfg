import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatInsectosComponent } from './cat-insectos.component';

describe('CatInsectosComponent', () => {
  let component: CatInsectosComponent;
  let fixture: ComponentFixture<CatInsectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatInsectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatInsectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
