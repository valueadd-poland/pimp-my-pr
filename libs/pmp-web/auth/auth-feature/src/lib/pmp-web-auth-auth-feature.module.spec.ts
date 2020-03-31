import { async, TestBed } from '@angular/core/testing';
import { PmpWebAuthAuthFeatureModule } from './pmp-web-auth-auth-feature.module';

describe('PmpWebAuthAuthFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebAuthAuthFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebAuthAuthFeatureModule).toBeDefined();
  });
});
