import { async, TestBed } from '@angular/core/testing';
import { PmpWebRepositoryRepositorySettingsDataAccessModule } from './pmp-web-repository-repository-settings-data-access.module';

describe('PmpWebRepositoryRepositorySettingsDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebRepositoryRepositorySettingsDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebRepositoryRepositorySettingsDataAccessModule).toBeDefined();
  });
});
