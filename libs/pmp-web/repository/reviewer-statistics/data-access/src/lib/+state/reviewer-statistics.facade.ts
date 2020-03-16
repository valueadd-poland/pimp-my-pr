import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetReviewerStatisticsResponseRequestPayload } from '../resources/request-payloads/get-reviewer-statistics-response.request-payload';
import { fromReviewerStatisticsActions } from './reviewer-statistics.actions';
import { ReviewerStatisticsPartialState } from './reviewer-statistics.reducer';
import { reviewerStatisticsQuery } from './reviewer-statistics.selectors';

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
