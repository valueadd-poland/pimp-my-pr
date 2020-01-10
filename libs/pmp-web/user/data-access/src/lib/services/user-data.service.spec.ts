import { TestBed } from '@angular/core/testing';

import { UserDataService } from './user-data.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserDataService', () => {
  let service: UserDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });

    service = TestBed.get(UserDataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    const service: UserDataService = TestBed.get(UserDataService);
    expect(service).toBeTruthy();
  });

  describe('#getUserStatisticsReadModelCollection', () => {
    it('should be successful', () => {
      const response = {} as any;

      service.getUserStatisticsCollection({} as any).subscribe(res => {
        expect(res).toBe(response);
      });

      const req = httpMock.expectOne(service.endpoints.getUserStatisticsCollection);
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });

    it('should throw error', () => {
      const response = {};

      service.getUserStatisticsCollection({} as any).subscribe(
        () => {
          fail('expecting error');
        },
        err => {
          expect(err.error).toBe(response);
        }
      );

      const req = httpMock.expectOne(service.endpoints.getUserStatisticsCollection);
      expect(req.request.method).toBe('GET');
      req.flush(response, {
        status: 400,
        statusText: 'Bad request'
      });
    });
  });
});
