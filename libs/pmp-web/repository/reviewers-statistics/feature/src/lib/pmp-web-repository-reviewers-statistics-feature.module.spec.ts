import { async, TestBed } from '@angular/core/testing';
import { PmpWebRepositoryReviewersStatisticsFeatureModule } from './pmp-web-repository-reviewers-statistics-feature.module';

describe('PmpWebRepositoryReviewersStatisticsFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebRepositoryReviewersStatisticsFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebRepositoryReviewersStatisticsFeatureModule).toBeDefined();
  });
});
