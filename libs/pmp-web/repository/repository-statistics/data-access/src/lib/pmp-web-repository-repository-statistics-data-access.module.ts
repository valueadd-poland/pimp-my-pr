import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RepositoryStatisticsEffects } from './+state/repository-statistics.effects';
import { RepositoryStatisticsFacade } from './+state/repository-statistics.facade';
import {
  initialState as singleRepositoryStatisticsInitialState,
  repositoryStatisticsReducer,
  SINGLEREPOSITORYSTATISTICS_FEATURE_KEY
} from './+state/repository-statistics.reducer';
import { RepositoryStatisticsDataService } from './services/repository-statistics-data.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(SINGLEREPOSITORYSTATISTICS_FEATURE_KEY, repositoryStatisticsReducer, {
      initialState: singleRepositoryStatisticsInitialState
    }),
    EffectsModule.forFeature([RepositoryStatisticsEffects])
  ],
  providers: [RepositoryStatisticsFacade, RepositoryStatisticsDataService]
})
export class PmpWebRepositoryRepositoryStatisticsDataAccessModule {}
