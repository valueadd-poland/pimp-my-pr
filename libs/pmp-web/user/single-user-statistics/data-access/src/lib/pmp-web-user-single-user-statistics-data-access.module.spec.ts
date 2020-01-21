import { async, TestBed } from '@angular/core/testing';
import { PmpWebUserSingleUserStatisticsDataAccessModule } from './pmp-web-user-single-user-statistics-data-access.module';

describe('PmpWebUserSingleUserStatisticsDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebUserSingleUserStatisticsDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebUserSingleUserStatisticsDataAccessModule).toBeDefined();
  });
});
