import { async, TestBed } from '@angular/core/testing';
import { PmpWebRepositoryShellModule } from './pmp-web-repository-shell.module';

describe('PmpWebRepositoryShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebRepositoryShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebRepositoryShellModule).toBeDefined();
  });
});
