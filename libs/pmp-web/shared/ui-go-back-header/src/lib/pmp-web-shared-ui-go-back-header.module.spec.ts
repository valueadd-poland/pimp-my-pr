import { TestBed, waitForAsync } from '@angular/core/testing';
import { PmpWebSharedUiGoBackHeaderModule } from './pmp-web-shared-ui-go-back-header.module';

describe('PmpWebSharedUiGoBackHeaderModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PmpWebSharedUiGoBackHeaderModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PmpWebSharedUiGoBackHeaderModule).toBeDefined();
  });
});
