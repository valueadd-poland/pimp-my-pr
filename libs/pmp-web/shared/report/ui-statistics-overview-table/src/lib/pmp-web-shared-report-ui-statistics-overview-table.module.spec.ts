import { async, TestBed } from '@angular/core/testing';
import { PmpWebSharedReportUiStatisticsOverviewTableModule } from './pmp-web-shared-report-ui-statistics-overview-table.module';

describe('PmpWebSharedReportUiStatisticsOverviewTableModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebSharedReportUiStatisticsOverviewTableModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebSharedReportUiStatisticsOverviewTableModule).toBeDefined();
  });
});
