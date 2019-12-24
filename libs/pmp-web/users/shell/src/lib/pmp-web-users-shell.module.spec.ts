import { async, TestBed } from '@angular/core/testing';
import { PmpWebUsersShellModule } from './pmp-web-users-shell.module';

describe('PmpWebUsersShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebUsersShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebUsersShellModule).toBeDefined();
  });
});
