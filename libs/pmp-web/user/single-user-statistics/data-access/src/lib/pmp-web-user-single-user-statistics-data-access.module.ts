import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  initialState as singleUserStatisticsInitialState,
  SINGLEUSERSTATISTICS_FEATURE_KEY,
  singleUserStatisticsReducer
} from './+state/single-user-statistics.reducer';
import { SingleUserStatisticsEffects } from './+state/single-user-statistics.effects';
import { SingleUserStatisticsFacade } from './+state/single-user-statistics.facade';
import { SingleUserStatisticsDataService } from './services/single-user-statistics-data.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(SINGLEUSERSTATISTICS_FEATURE_KEY, singleUserStatisticsReducer, {
      initialState: singleUserStatisticsInitialState
    }),
    EffectsModule.forFeature([SingleUserStatisticsEffects])
  ],
  providers: [SingleUserStatisticsDataService, SingleUserStatisticsFacade]
})
export class PmpWebUserSingleUserStatisticsDataAccessModule {}
