import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  SINGLEREPOSITORYSTATISTICS_FEATURE_KEY,
  initialState as singleRepositoryStatisticsInitialState,
  repositoryStatisticsReducer
} from './+state/repository-statistics.reducer';
import { RepositoryStatisticsEffects } from './+state/repository-statistics.effects';
import { RepositoryStatisticsFacade } from './+state/repository-statistics.facade';
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
export class PmpWebReportRepositoryStatisticsDataAccessModule {}
