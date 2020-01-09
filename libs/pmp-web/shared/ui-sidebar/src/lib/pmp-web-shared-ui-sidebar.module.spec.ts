import { async, TestBed } from '@angular/core/testing';
import { PmpWebSharedUiSidebarModule } from './pmp-web-shared-ui-sidebar.module';

describe('PmpWebSharedUiSidebarModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebSharedUiSidebarModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebSharedUiSidebarModule).toBeDefined();
  });
});
