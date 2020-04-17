import { async, TestBed } from '@angular/core/testing';
import { PmpWebCoreModule } from './pmp-web-core.module';

describe('PmpWebCoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebCoreModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebCoreModule).toBeDefined();
  });
});
