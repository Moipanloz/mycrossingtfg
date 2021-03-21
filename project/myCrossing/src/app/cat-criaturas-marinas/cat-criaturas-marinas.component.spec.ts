import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCriaturasMarinasComponent } from './cat-criaturas-marinas.component';

describe('CatCriaturasMarinasComponent', () => {
  let component: CatCriaturasMarinasComponent;
  let fixture: ComponentFixture<CatCriaturasMarinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatCriaturasMarinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatCriaturasMarinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
