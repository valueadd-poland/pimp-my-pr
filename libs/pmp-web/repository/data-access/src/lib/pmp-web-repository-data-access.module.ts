import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { REPOSITORY_FEATURE_KEY, repositoryReducer } from './+state/repository.reducer';
import { RepositoryEffects } from './+state/repository.effects';
import { RepositoryFacade } from './+state/repository.facade';
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
