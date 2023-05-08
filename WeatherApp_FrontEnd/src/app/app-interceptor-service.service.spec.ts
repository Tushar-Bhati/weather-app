import { TestBed } from '@angular/core/testing';

import { AppInterceptorServiceService} from './app-interceptor-service.service';

describe('AppInterceptorServiceService', () => {
  let service: AppInterceptorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInterceptorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
