import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatArteComponent } from './cat-arte.component';

describe('CatArteComponent', () => {
  let component: CatArteComponent;
  let fixture: ComponentFixture<CatArteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatArteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatArteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
