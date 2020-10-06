import { async, TestBed } from '@angular/core/testing';
import { PmpWebRepositoryRepositoryPrTimelineFeatureModule } from './pmp-web-repository-repository-pr-timeline-feature.module';

describe('PmpWebRepositoryRepositoryPrTimelineFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebRepositoryRepositoryPrTimelineFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebRepositoryRepositoryPrTimelineFeatureModule).toBeDefined();
  });
});
