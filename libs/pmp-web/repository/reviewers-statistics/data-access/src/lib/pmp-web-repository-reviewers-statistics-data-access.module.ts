import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReviewersEffects } from './+state/reviewers.effects';
import { ReviewersFacade } from './+state/reviewers.facade';
import { REVIEWERS_FEATURE_KEY, reviewersReducer } from './+state/reviewers.reducer';
import { ReviewersDataService } from './services/reviewers-data.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(REVIEWERS_FEATURE_KEY, reviewersReducer),
    EffectsModule.forFeature([ReviewersEffects])
  ],
  providers: [ReviewersFacade, ReviewersDataService]
})
export class PmpWebRepositoryReviewersStatisticsDataAccessModule {}
