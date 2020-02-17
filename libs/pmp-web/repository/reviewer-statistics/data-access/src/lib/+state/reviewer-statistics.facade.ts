import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ReviewerStatisticsPartialState } from './reviewer-statistics.reducer';
import { reviewerStatisticsQuery } from './reviewer-statistics.selectors';
import { fromReviewerStatisticsActions } from './reviewer-statistics.actions';
import { GetReviewerStatisticsResponseRequestPayload } from '../resources/request-payloads/get-reviewer-statistics-response.request-payload';

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

  constructor(private store: Store<ReviewerStatisticsPartialState>) {}

  getReviewerStatisticsResponse(data: GetReviewerStatisticsResponseRequestPayload): void {
    this.store.dispatch(new fromReviewerStatisticsActions.GetReviewerStatisticsResponse(data));
  }
}
