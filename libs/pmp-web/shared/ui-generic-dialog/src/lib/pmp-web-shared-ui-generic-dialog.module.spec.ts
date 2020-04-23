import { async, TestBed } from '@angular/core/testing';
import { PmpWebSharedUiGenericDialogModule } from './pmp-web-shared-ui-generic-dialog.module';

describe('PmpWebSharedUiGenericDialogModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebSharedUiGenericDialogModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebSharedUiGenericDialogModule).toBeDefined();
  });
});
