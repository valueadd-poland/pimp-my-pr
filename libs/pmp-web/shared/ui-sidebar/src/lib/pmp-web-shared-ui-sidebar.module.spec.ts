import { TestBed, waitForAsync } from '@angular/core/testing';
import { PmpWebSharedUiSidebarModule } from './pmp-web-shared-ui-sidebar.module';

describe('PmpWebSharedUiSidebarModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PmpWebSharedUiSidebarModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PmpWebSharedUiSidebarModule).toBeDefined();
  });
});
