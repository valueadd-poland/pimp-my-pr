import { TestBed, waitForAsync } from '@angular/core/testing';
import { PmpWebRepositoryReviewerStatisticsDataAccessModule } from './pmp-web-repository-reviewer-statistics-data-access.module';

describe('PmpWebRepositoryReviewerStatisticsDataAccessModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PmpWebRepositoryReviewerStatisticsDataAccessModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PmpWebRepositoryReviewerStatisticsDataAccessModule).toBeDefined();
  });
});
