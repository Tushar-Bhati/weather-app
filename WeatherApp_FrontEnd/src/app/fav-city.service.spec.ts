import { TestBed } from '@angular/core/testing';

import { FavCityService } from './watchlistcity.service';

describe('FavCityService', () => {
  let service: FavCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
