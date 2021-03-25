import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCazarAhoraComponent } from './cat-cazar-ahora.component';

describe('CatCazarAhoraComponent', () => {
  let component: CatCazarAhoraComponent;
  let fixture: ComponentFixture<CatCazarAhoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatCazarAhoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatCazarAhoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
