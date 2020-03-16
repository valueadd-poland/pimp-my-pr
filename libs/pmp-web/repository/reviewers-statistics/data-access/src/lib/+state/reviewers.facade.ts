import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetReviewersStatisticsCollectionPayload } from '@pimp-my-pr/pmp-web/repository/domain';
import { fromUserActions } from './reviewers.actions';
import { ReviewersStatisticsPartialState } from './reviewers.reducer';
import { reviewersStatisticsQuery } from './reviewers.selectors';

@Injectable()
export class ReviewersFacade {
  reviewersStatisticsCollection$ = this.store.pipe(
    select(reviewersStatisticsQuery.getReviewersStatisticsCollection)
  );
  reviewersStatisticsCollectionLoading$ = this.store.pipe(
    select(reviewersStatisticsQuery.getReviewersStatisticsCollectionLoading)
  );
  reviewersStatisticsCollectionLoadError$ = this.store.pipe(
    select(reviewersStatisticsQuery.getReviewersStatisticsCollectionLoadError)
  );
  constructor(private store: Store<ReviewersStatisticsPartialState>) {}

  getReviewersStatisticsCollection(data: GetReviewersStatisticsCollectionPayload): void {
    this.store.dispatch(new fromUserActions.GetReviewersStatisticsCollection(data));
  }
}
