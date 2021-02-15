import { TestBed } from '@angular/core/testing';
import { ItemsCEService } from './itemsce.service';


describe('ItemsCEService', () => {
  let service: ItemsCEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsCEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
