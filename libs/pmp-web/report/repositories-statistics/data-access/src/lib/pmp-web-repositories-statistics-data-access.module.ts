import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  REPOSITORIES_STATISTICS_FEATURE_KEY,
  repositoriesStatisticsReducer
} from './+state/repositories-statistics.reducer';
import { RepositoriesStatisticsEffects } from './+state/repositories-statistics.effects';
import { RepositoriesStatisticsFacade } from './+state/repositories-statistics.facade';
import { RepositoriesStatisticsDataService } from './services/repositories-statistics-data.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(REPOSITORIES_STATISTICS_FEATURE_KEY, repositoriesStatisticsReducer),
    EffectsModule.forFeature([RepositoriesStatisticsEffects])
  ],
  providers: [RepositoriesStatisticsFacade, RepositoriesStatisticsDataService]
})
export class PmpWebRepositoriesStatisticsDataAccessModule {}
