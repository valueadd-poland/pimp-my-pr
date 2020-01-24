import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { fromSingleRepositoryStatisticsActions } from './single-repository-statistics.actions';
import { SingleRepositoryStatisticsPartialState } from './single-repository-statistics.reducer';
import { SingleRepositoryStatisticsDataService } from '../services/single-repository-statistics-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataPersistence } from '@nrwl/angular';

@Injectable()
export class SingleRepositoryStatisticsEffects {
  @Effect()
  getRepositoryStatistics$ = this.dp.fetch(
    fromSingleRepositoryStatisticsActions.Types.GetRepositoryStatistics,
    {
      id: () => {},
      run: (action: fromSingleRepositoryStatisticsActions.GetRepositoryStatistics) => {
        return this.singleRepositoryStatisticsDataService
          .getRepositoryStatistics(action.payload)
          .pipe(
            map(
              data => new fromSingleRepositoryStatisticsActions.GetRepositoryStatisticsSuccess(data)
            )
          );
      },
      onError: (
        action: fromSingleRepositoryStatisticsActions.GetRepositoryStatistics,
        error: HttpErrorResponse
      ) => {
        return new fromSingleRepositoryStatisticsActions.GetRepositoryStatisticsFail(error);
      }
    }
  );

  constructor(
    private dp: DataPersistence<SingleRepositoryStatisticsPartialState>,
    private singleRepositoryStatisticsDataService: SingleRepositoryStatisticsDataService
  ) {}
}
