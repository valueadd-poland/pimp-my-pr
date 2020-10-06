import { async, TestBed } from '@angular/core/testing';
import { PmpWebRepositoryRepositoryPrTimelineDataAccessModule } from './pmp-web-repository-repository-pr-timeline-data-access.module';

describe('PmpWebRepositoryRepositoryPrTimelineDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebRepositoryRepositoryPrTimelineDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebRepositoryRepositoryPrTimelineDataAccessModule).toBeDefined();
  });
});
