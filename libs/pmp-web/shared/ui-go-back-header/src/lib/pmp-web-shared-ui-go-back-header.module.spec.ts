import { async, TestBed } from '@angular/core/testing';
import { PmpWebSharedUiGoBackHeaderModule } from './pmp-web-shared-ui-go-back-header.module';

describe('PmpWebSharedUiGoBackHeaderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebSharedUiGoBackHeaderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebSharedUiGoBackHeaderModule).toBeDefined();
  });
});
