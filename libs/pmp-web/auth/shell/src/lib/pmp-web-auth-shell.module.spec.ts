import { async, TestBed } from '@angular/core/testing';
import { PmpWebAuthShellModule } from './pmp-web-auth-shell.module';

describe('PmpWebLoginShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebAuthShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebAuthShellModule).toBeDefined();
  });
});
