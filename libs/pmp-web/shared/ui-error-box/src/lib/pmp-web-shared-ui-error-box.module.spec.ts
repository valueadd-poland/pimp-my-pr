import { TestBed, waitForAsync } from '@angular/core/testing';
import { PmpWebSharedUiErrorBoxModule } from './pmp-web-shared-ui-error-box.module';

describe('PmpWebSharedUiErrorBoxModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PmpWebSharedUiErrorBoxModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PmpWebSharedUiErrorBoxModule).toBeDefined();
  });
});
