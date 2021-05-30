import { TestBed, waitForAsync } from '@angular/core/testing';
import { PmpWebRepositoryRepositoryPrTimelineDataAccessModule } from './pmp-web-repository-repository-pr-timeline-data-access.module';

describe('PmpWebRepositoryRepositoryPrTimelineDataAccessModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PmpWebRepositoryRepositoryPrTimelineDataAccessModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PmpWebRepositoryRepositoryPrTimelineDataAccessModule).toBeDefined();
  });
});
