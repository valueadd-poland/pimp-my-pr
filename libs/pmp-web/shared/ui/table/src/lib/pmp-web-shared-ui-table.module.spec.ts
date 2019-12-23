import { async, TestBed } from '@angular/core/testing';
import { PmpWebSharedUiTableModule } from './pmp-web-shared-ui-table.module';

describe('PmpWebSharedUiTableModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebSharedUiTableModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebSharedUiTableModule).toBeDefined();
  });
});
