import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  SINGLEREPOSITORYSTATISTICS_FEATURE_KEY,
  initialState as singleRepositoryStatisticsInitialState,
  singleRepositoryStatisticsReducer
} from './+state/single-repository-statistics.reducer';
import { SingleRepositoryStatisticsEffects } from './+state/single-repository-statistics.effects';
import { SingleRepositoryStatisticsFacade } from './+state/single-repository-statistics.facade';
import { SingleRepositoryStatisticsDataService } from './services/single-repository-statistics-data.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      SINGLEREPOSITORYSTATISTICS_FEATURE_KEY,
      singleRepositoryStatisticsReducer,
      { initialState: singleRepositoryStatisticsInitialState }
    ),
    EffectsModule.forFeature([SingleRepositoryStatisticsEffects])
  ],
  providers: [SingleRepositoryStatisticsFacade, SingleRepositoryStatisticsDataService]
})
export class PmpWebRepositoryDataAccessSingleRepositoryStatisticsModule {}
