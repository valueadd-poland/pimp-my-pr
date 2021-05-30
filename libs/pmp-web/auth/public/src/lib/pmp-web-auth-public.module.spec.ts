import { TestBed, waitForAsync } from '@angular/core/testing';
import { PmpWebAuthPublicModule } from './pmp-web-auth-public.module';

describe('PmpWebAuthPublicModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PmpWebAuthPublicModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PmpWebAuthPublicModule).toBeDefined();
  });
});
