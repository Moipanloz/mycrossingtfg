import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCazaCriaturasMarinasComponent } from './cat-caza-criaturas-marinas.component';

describe('CatCazaCriaturasMarinasComponent', () => {
  let component: CatCazaCriaturasMarinasComponent;
  let fixture: ComponentFixture<CatCazaCriaturasMarinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatCazaCriaturasMarinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatCazaCriaturasMarinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
