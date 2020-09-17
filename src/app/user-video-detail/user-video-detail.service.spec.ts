import { TestBed } from '@angular/core/testing';

import { UserVideoDetailService } from './user-video-detail.service';

describe('UserVideoDetailService', () => {
  let service: UserVideoDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserVideoDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
