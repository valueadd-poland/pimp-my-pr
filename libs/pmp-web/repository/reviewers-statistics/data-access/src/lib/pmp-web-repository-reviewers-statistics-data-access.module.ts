import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { REVIEWERS_FEATURE_KEY, reviewersReducer } from './+state/reviewers.reducer';
import { ReviewersEffects } from './+state/reviewers.effects';
import { ReviewersFacade } from './+state/reviewers.facade';
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
