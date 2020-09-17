import { TestBed } from '@angular/core/testing';

import { EditTraineeService } from './edit-trainee.service';

describe('EditTraineeService', () => {
  let service: EditTraineeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditTraineeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
