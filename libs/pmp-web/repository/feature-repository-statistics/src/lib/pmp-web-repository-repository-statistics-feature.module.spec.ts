import { async, TestBed } from '@angular/core/testing';
import { PmpWebRepositoryRepositoryStatisticsFeatureModule } from './pmp-web-repository-repository-statistics-feature.module';

describe('PmpWebRepositoryRepositoryStatisticsFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebRepositoryRepositoryStatisticsFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebRepositoryRepositoryStatisticsFeatureModule).toBeDefined();
  });
});
