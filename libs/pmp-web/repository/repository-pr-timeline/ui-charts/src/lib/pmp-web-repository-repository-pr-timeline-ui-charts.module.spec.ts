import { async, TestBed } from '@angular/core/testing';
import { PmpWebRepositoryRepositoryPrTimelineUiChartsModule } from './pmp-web-repository-repository-pr-timeline-ui-charts.module';

describe('PmpWebRepositoryRepositoryPrTimelineUiChartsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebRepositoryRepositoryPrTimelineUiChartsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebRepositoryRepositoryPrTimelineUiChartsModule).toBeDefined();
  });
});
