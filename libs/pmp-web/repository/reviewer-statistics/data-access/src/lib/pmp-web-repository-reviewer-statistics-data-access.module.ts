import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReviewerStatisticsEffects } from './+state/reviewer-statistics.effects';
import { ReviewerStatisticsFacade } from './+state/reviewer-statistics.facade';
import {
  initialState as reviewerStatisticsInitialState,
  REVIEWERSTATISTICS_FEATURE_KEY,
  reviewerStatisticsReducer
} from './+state/reviewer-statistics.reducer';
import { ReviewerStatisticsDataService } from './services/reviewer-statistics-data.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(REVIEWERSTATISTICS_FEATURE_KEY, reviewerStatisticsReducer, {
      initialState: reviewerStatisticsInitialState
    }),
    EffectsModule.forFeature([ReviewerStatisticsEffects])
  ],
  providers: [ReviewerStatisticsDataService, ReviewerStatisticsFacade]
})
export class PmpWebRepositoryReviewerStatisticsDataAccessModule {}
