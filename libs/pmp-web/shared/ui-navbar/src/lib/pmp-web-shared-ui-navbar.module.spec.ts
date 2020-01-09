import { async, TestBed } from '@angular/core/testing';
import { PmpWebSharedUiNavbarModule } from './pmp-web-shared-ui-navbar.module';

describe('PmpWebSharedUiNavbarModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebSharedUiNavbarModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebSharedUiNavbarModule).toBeDefined();
  });
});
