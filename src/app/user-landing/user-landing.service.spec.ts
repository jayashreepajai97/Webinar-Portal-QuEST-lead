import { TestBed } from '@angular/core/testing';

import { UserLandingService } from './user-landing.service';

describe('UserLandingService', () => {
  let service: UserLandingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLandingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
