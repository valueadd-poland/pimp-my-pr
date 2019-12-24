import { async, TestBed } from '@angular/core/testing';
import { PmpWebProfileShellModule } from './pmp-web-profile-shell.module';

describe('PmpWebProfileShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebProfileShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebProfileShellModule).toBeDefined();
  });
});
