import { async, TestBed } from '@angular/core/testing';
import { PmpWebSharedDomainModule } from './pmp-web-shared-domain.module';

describe('PmpWebSharedDomainModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebSharedDomainModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebSharedDomainModule).toBeDefined();
  });
});
