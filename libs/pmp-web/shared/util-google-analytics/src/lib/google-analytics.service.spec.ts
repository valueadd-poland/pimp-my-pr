import { TestBed } from '@angular/core/testing';

import { GoogleAnalyticsService } from './google-analytics.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('GoogleAnalyticsService', () => {
  let service: GoogleAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [GoogleAnalyticsService]
    });
    service = TestBed.inject(GoogleAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
