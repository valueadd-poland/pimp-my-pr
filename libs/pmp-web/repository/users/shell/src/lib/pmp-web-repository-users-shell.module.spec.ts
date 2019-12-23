import { async, TestBed } from '@angular/core/testing';
import { PmpWebRepositoryUsersShellModule } from './pmp-web-repository-users-shell.module';

describe('PmpWebRepositoryUsersShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebRepositoryUsersShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebRepositoryUsersShellModule).toBeDefined();
  });
});
