import { async, TestBed } from '@angular/core/testing';
import { PmpWebSharedUiTableModule } from './pmp-web-shared-ui-table.module';
import { MatIconModule, MatTableModule } from '@angular/material';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';

describe('PmpWebSharedUiTableModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebSharedUiTableModule, MatTableModule, PmpWebSharedUtilModule, MatIconModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebSharedUiTableModule).toBeDefined();
  });
});
