import { TestBed, waitForAsync } from '@angular/core/testing';
import { PmpWebSharedUtilModule } from './pmp-web-shared-util.module';

describe('PmpWebSharedUtilModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PmpWebSharedUtilModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PmpWebSharedUtilModule).toBeDefined();
  });
});
