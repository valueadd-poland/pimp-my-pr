import { async, TestBed } from '@angular/core/testing';
import { PmpWebAuthPublicModule } from './pmp-web-auth-public.module';

describe('PmpWebAuthPublicModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebAuthPublicModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebAuthPublicModule).toBeDefined();
  });
});
