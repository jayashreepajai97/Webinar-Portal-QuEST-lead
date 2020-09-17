import { TestBed } from '@angular/core/testing';

import { AddTraineeService } from './add-trainee.service';

describe('AddTraineeService', () => {
  let service: AddTraineeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTraineeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
