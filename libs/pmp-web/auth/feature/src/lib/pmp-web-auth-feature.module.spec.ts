import { TestBed, waitForAsync } from '@angular/core/testing';
import { PmpWebAuthFeatureModule } from './pmp-web-auth-feature.module';

describe('PmpWebAuthFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PmpWebAuthFeatureModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PmpWebAuthFeatureModule).toBeDefined();
  });
});
