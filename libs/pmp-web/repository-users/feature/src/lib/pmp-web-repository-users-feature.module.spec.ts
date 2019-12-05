import { async, TestBed } from '@angular/core/testing';

import { PmpWebRepositoryUsersFeatureModule } from './pmp-web-repository-users-feature.module';

describe('PmpWebRepositoryUsersFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebRepositoryUsersFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebRepositoryUsersFeatureModule).toBeDefined();
  });
});
