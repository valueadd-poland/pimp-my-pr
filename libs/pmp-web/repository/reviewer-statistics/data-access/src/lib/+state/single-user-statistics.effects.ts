import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { fromSingleUserStatisticsActions } from './single-user-statistics.actions';
import { SingleUserStatisticsPartialState } from './single-user-statistics.reducer';
import { SingleUserStatisticsDataService } from '../services/single-user-statistics-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataPersistence } from '@nrwl/angular';

@Injectable()
export class SingleUserStatisticsEffects {
  @Effect()
  getSingleUserStatisticsResponse$ = this.dp.fetch(
    fromSingleUserStatisticsActions.Types.GetSingleUserStatisticsResponse,
    {
      run: (action: fromSingleUserStatisticsActions.GetSingleUserStatisticsResponse) => {
        return this.singleUserStatisticsDataService
          .getSingleUserStatisticsResponse(action.payload)
          .pipe(
            map(
              data =>
                new fromSingleUserStatisticsActions.GetSingleUserStatisticsResponseSuccess(data)
            )
          );
      },
      onError: (
        action: fromSingleUserStatisticsActions.GetSingleUserStatisticsResponse,
        error: HttpErrorResponse
      ) => {
        return new fromSingleUserStatisticsActions.GetSingleUserStatisticsResponseFail(error);
      }
    }
  );

  constructor(
    private dp: DataPersistence<SingleUserStatisticsPartialState>,
    private singleUserStatisticsDataService: SingleUserStatisticsDataService
  ) {}
}
