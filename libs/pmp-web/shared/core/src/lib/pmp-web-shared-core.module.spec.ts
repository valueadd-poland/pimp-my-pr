import { async, TestBed } from '@angular/core/testing';
import { PmpWebSharedCoreModule } from './pmp-web-shared-core.module';

describe('PmpWebSharedCoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebSharedCoreModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebSharedCoreModule).toBeDefined();
  });
});
