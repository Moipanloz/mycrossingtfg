import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaMenuComponent } from './tarea-menu.component';

describe('TareaMenuComponent', () => {
  let component: TareaMenuComponent;
  let fixture: ComponentFixture<TareaMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
