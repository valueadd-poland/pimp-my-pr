import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { fromReviewerStatisticsActions } from './reviewer-statistics.actions';
import { ReviewerStatisticsPartialState } from './reviewer-statistics.reducer';
import { ReviewerStatisticsDataService } from '../services/reviewer-statistics-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataPersistence } from '@nrwl/angular';

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
