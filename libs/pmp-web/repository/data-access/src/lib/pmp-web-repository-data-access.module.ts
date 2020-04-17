import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RepositoryEffects } from './+state/repository.effects';
import { RepositoryFacade } from './+state/repository.facade';
import { REPOSITORY_FEATURE_KEY, repositoryReducer } from './+state/repository.reducer';
import { RepositoryDataService } from './services/repository-data.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(REPOSITORY_FEATURE_KEY, repositoryReducer),
    EffectsModule.forFeature([RepositoryEffects])
  ],
  providers: [RepositoryFacade, RepositoryDataService]
})
export class PmpWebRepositoryDataAccessModule {}
