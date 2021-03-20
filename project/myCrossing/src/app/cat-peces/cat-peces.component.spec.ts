import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatPecesComponent } from './cat-peces.component';

describe('CatPecesComponent', () => {
  let component: CatPecesComponent;
  let fixture: ComponentFixture<CatPecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatPecesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatPecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
