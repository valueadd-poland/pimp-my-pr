import { async, TestBed } from '@angular/core/testing';
import { PmpWebAuthFeatureModule } from './pmp-web-auth-feature.module';

describe('PmpWebAuthFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebAuthFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebAuthFeatureModule).toBeDefined();
  });
});
