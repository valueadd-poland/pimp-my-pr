import { async, TestBed } from '@angular/core/testing';
import { PmpWebUserShellModule } from './pmp-web-user-shell.module';

describe('PmpWebUserShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebUserShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebUserShellModule).toBeDefined();
  });
});
