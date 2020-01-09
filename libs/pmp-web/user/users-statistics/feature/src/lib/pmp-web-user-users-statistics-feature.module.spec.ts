import { async, TestBed } from '@angular/core/testing';
import { PmpWebUserUsersStatisticsFeatureModule } from './pmp-web-user-users-statistics-feature.module';

describe('PmpWebUserUsersStatisticsFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebUserUsersStatisticsFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebUserUsersStatisticsFeatureModule).toBeDefined();
  });
});
