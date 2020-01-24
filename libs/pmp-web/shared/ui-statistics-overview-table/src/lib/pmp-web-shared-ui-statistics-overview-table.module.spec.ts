import { async, TestBed } from '@angular/core/testing';
import { PmpWebSharedUiStatisticsOverviewTableModule } from './pmp-web-shared-ui-statistics-overview-table.module';

describe('PmpWebSharedUiStatisticsOverviewTableModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebSharedUiStatisticsOverviewTableModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebSharedUiStatisticsOverviewTableModule).toBeDefined();
  });
});
