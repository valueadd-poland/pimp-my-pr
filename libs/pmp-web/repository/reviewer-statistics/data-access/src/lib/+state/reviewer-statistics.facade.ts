import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetReviewerStatisticsPayload } from '../resources/payloads/get-reviewer-statistics.payload';
import { fromReviewerStatisticsActions } from './reviewer-statistics.actions';
import { ReviewerStatisticsPartialState } from './reviewer-statistics.reducer';
import { reviewerStatisticsQuery } from './reviewer-statistics.selectors';
import { ToggleSelectedRepository } from '../resources/payloads/toggle-selected-repository.interface';
import { RepositoryModel } from '@pimp-my-pr/shared/domain';

@Injectable()
export class ReviewerStatisticsFacade {
  // TODO Remove 'Response' from name
  reviewerStatistics$ = this.store.pipe(
    select(reviewerStatisticsQuery.getReviewerStatisticsResponse)
  );
  reviewerStatisticsResponseLoading$ = this.store.pipe(
    select(reviewerStatisticsQuery.getReviewerStatisticsResponseLoading)
  );
  reviewerStatisticsResponseLoadError$ = this.store.pipe(
    select(reviewerStatisticsQuery.getReviewerStatisticsResponseLoadError)
  );
  selectedRepositories$ = this.store.pipe(
    select(reviewerStatisticsQuery.getReviewerStatisticsSelectedRepositories)
  );

  constructor(private store: Store<ReviewerStatisticsPartialState>) {}

  getReviewerStatistics(data: GetReviewerStatisticsPayload): void {
    this.store.dispatch(new fromReviewerStatisticsActions.GetReviewerStatisticsResponse(data));
  }

  addSelectedRepository(data: RepositoryModel): void {
    this.store.dispatch(
      new fromReviewerStatisticsActions.ReviewerStatisticsAddSelectedRepository(data)
    );
  }

  removeSelectedRepository(data: RepositoryModel): void {
    this.store.dispatch(
      new fromReviewerStatisticsActions.ReviewerStatisticsRemoveSelectedRepository(data)
    );
  }
}
