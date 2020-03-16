import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { ReviewerStatisticsDataService } from '../services/reviewer-statistics-data.service';
import { fromReviewerStatisticsActions } from './reviewer-statistics.actions';
import { ReviewerStatisticsPartialState } from './reviewer-statistics.reducer';

@Injectable()
export class ReviewerStatisticsEffects {
  @Effect()
  getReviewerStatisticsResponse$ = this.dp.fetch(
    fromReviewerStatisticsActions.Types.GetReviewerStatisticsResponse,
    {
      run: (action: fromReviewerStatisticsActions.GetReviewerStatisticsResponse) => {
        return this.reviewerStatisticsDataService
          .getReviewerStatisticsResponse(action.payload)
          .pipe(
            map(
              data => new fromReviewerStatisticsActions.GetReviewerStatisticsResponseSuccess(data)
            )
          );
      },
      onError: (
        action: fromReviewerStatisticsActions.GetReviewerStatisticsResponse,
        error: HttpErrorResponse
      ) => {
        return new fromReviewerStatisticsActions.GetReviewerStatisticsResponseFail(error);
      }
    }
  );

  constructor(
    private dp: DataPersistence<ReviewerStatisticsPartialState>,
    private reviewerStatisticsDataService: ReviewerStatisticsDataService
  ) {}
}
