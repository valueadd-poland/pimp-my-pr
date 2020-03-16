import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { ReviewersDataService } from '../services/reviewers-data.service';
import { fromUserActions } from './reviewers.actions';
import { ReviewersStatisticsPartialState } from './reviewers.reducer';

@Injectable()
export class ReviewersEffects {
  @Effect()
  getReviewersStatisticsCollection$ = this.dp.fetch(
    fromUserActions.Types.GetReviewersStatisticsCollection,
    {
      run: (action: fromUserActions.GetReviewersStatisticsCollection) => {
        return this.userDataService
          .getReviewersStatisticsCollection(action.payload)
          .pipe(map(data => new fromUserActions.GetReviewersStatisticsCollectionSuccess(data)));
      },
      onError: (
        action: fromUserActions.GetReviewersStatisticsCollection,
        error: HttpErrorResponse
      ) => {
        return new fromUserActions.GetReviewersStatisticsCollectionFail(error);
      }
    }
  );

  constructor(
    private dp: DataPersistence<ReviewersStatisticsPartialState>,
    private userDataService: ReviewersDataService
  ) {}
}
