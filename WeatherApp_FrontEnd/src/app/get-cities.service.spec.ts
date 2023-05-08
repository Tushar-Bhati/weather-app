import { TestBed } from '@angular/core/testing';

import { GetCitiesService } from './get-cities.service';

describe('GetCitiesService', () => {
  let service: GetCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
