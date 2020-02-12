import { async, TestBed } from '@angular/core/testing';
import { PmpWebReportSingleUserStatisticsDataAccessModule } from './pmp-web-report-single-user-statistics-data-access.module';

describe('PmpWebReportSingleUserStatisticsDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebReportSingleUserStatisticsDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebReportSingleUserStatisticsDataAccessModule).toBeDefined();
  });
});
