import { TestBed, waitForAsync } from '@angular/core/testing';
import { PmpWebSharedUiNavbarModule } from './pmp-web-shared-ui-navbar.module';

describe('PmpWebSharedUiNavbarModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PmpWebSharedUiNavbarModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PmpWebSharedUiNavbarModule).toBeDefined();
  });
});
