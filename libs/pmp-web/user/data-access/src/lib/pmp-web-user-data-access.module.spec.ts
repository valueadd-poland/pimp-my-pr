import { async, TestBed } from '@angular/core/testing';
import { PmpWebUserDataAccessModule } from './pmp-web-user-data-access.module';

describe('PmpWebUserDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebUserDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebUserDataAccessModule).toBeDefined();
  });
});
