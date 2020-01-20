import { async, TestBed } from '@angular/core/testing';
import { PmpWebSharedUiHeaderContainerModule } from './pmp-web-shared-ui-header-container.module';

describe('PmpWebSharedUiHeaderContainerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebSharedUiHeaderContainerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebSharedUiHeaderContainerModule).toBeDefined();
  });
});
