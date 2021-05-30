import { TestBed, waitForAsync } from '@angular/core/testing';
import { PmpWebRepositoryReviewersStatisticsFeatureModule } from './pmp-web-repository-reviewers-statistics-feature.module';

describe('PmpWebRepositoryReviewersStatisticsFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PmpWebRepositoryReviewersStatisticsFeatureModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PmpWebRepositoryReviewersStatisticsFeatureModule).toBeDefined();
  });
});
