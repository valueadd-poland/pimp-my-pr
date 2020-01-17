import { async, TestBed } from '@angular/core/testing';
import { PmpWebRepositoryRepositoriesStatisticsFeatureModule } from './pmp-web-repository-repositories-statistics-feature.module';

describe('PmpWebRepositoryRepositoriesStatisticsFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebRepositoryRepositoriesStatisticsFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebRepositoryRepositoriesStatisticsFeatureModule).toBeDefined();
  });
});
