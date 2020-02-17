import { async, TestBed } from '@angular/core/testing';
import { PmpWebRepositoryReviewerStatisticsDataAccessModule } from './pmp-web-repository-reviewer-statistics-data-access.module';

describe('PmpWebRepositoryReviewerStatisticsDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebRepositoryReviewerStatisticsDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebRepositoryReviewerStatisticsDataAccessModule).toBeDefined();
  });
});
