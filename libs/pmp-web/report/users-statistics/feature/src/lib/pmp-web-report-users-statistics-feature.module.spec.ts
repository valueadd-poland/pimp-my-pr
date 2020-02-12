import { async, TestBed } from '@angular/core/testing';
import { PmpWebReportUsersStatisticsFeatureModule } from './pmp-web-report-users-statistics-feature.module';

describe('PmpWebReportUsersStatisticsFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebReportUsersStatisticsFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebReportUsersStatisticsFeatureModule).toBeDefined();
  });
});
