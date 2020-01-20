import { async, TestBed } from '@angular/core/testing';
import { PmpWebSharedUiTableStatisticModule } from './pmp-web-shared-ui-table-statistic.module';

describe('PmpWebSharedUiTableStatisticModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebSharedUiTableStatisticModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebSharedUiTableStatisticModule).toBeDefined();
  });
});
