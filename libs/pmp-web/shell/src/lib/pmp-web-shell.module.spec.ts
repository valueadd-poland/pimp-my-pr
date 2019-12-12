import { async, TestBed } from '@angular/core/testing';
import { PmpWebShellModule } from './pmp-web-shell.module';

describe('PmpWebShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebShellModule).toBeDefined();
  });
});
