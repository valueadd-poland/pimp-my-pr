import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { RepositoryStatisticsDataService } from '../services/repository-statistics-data.service';
import { fromSingleRepositoryStatisticsActions } from './repository-statistics.actions';
import { SingleRepositoryStatisticsPartialState } from './repository-statistics.reducer';

@Injectable()
export class RepositoryStatisticsEffects {
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
    private singleRepositoryStatisticsDataService: RepositoryStatisticsDataService
  ) {}
}
