import { TestBed, waitForAsync } from '@angular/core/testing';
import { PmpWebAuthLoginFeatureModule } from './pmp-web-auth-login-feature.module';

describe('PmpWebAuthLoginFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PmpWebAuthLoginFeatureModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PmpWebAuthLoginFeatureModule).toBeDefined();
  });
});
