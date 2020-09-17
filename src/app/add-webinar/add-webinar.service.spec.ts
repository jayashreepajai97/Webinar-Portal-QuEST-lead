import { TestBed } from '@angular/core/testing';

import { AddWebinarService } from './add-webinar.service';

describe('AddWebinarService', () => {
  let service: AddWebinarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddWebinarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
