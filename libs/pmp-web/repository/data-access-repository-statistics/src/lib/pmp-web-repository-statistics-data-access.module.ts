import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  REPOSITORY_STATISTICS_FEATURE_KEY,
  repositoryStatisticsReducer
} from './+state/repository-statistics.reducer';
import { RepositoryStatisticsEffects } from './+state/repository-statistics.effects';
import { RepositoryStatisticsFacade } from './+state/repository-statistics.facade';
import { RepositoryStatisticsDataService } from './services/repository-statistics-data.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(REPOSITORY_STATISTICS_FEATURE_KEY, repositoryStatisticsReducer),
    EffectsModule.forFeature([RepositoryStatisticsEffects])
  ],
  providers: [RepositoryStatisticsFacade, RepositoryStatisticsDataService]
})
export class PmpWebRepositoryStatisticsDataAccessModule {}
