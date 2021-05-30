import { TestBed, waitForAsync } from '@angular/core/testing';
import { PmpWebRepositoryUiStatisticsOverviewTableModule } from './pmp-web-repository-ui-statistics-overview-table.module';

describe('PmpWebRepositoryUiStatisticsOverviewTableModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PmpWebRepositoryUiStatisticsOverviewTableModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PmpWebRepositoryUiStatisticsOverviewTableModule).toBeDefined();
  });
});
