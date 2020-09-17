import { TestBed } from '@angular/core/testing';

import { EditWebinarService } from './edit-webinar.service';

describe('EditWebinarService', () => {
  let service: EditWebinarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditWebinarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
