import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSuenoComponent } from './cat-sueno.component';

describe('CatSuenoComponent', () => {
  let component: CatSuenoComponent;
  let fixture: ComponentFixture<CatSuenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatSuenoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatSuenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
