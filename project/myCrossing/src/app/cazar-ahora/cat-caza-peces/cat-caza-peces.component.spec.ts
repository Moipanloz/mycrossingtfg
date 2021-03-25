import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCazaPecesComponent } from './cat-caza-peces.component';

describe('CatCazaPecesComponent', () => {
  let component: CatCazaPecesComponent;
  let fixture: ComponentFixture<CatCazaPecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatCazaPecesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatCazaPecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
