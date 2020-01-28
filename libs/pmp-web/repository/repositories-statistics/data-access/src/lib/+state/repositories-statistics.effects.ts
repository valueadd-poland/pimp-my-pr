import { Injectable } from '@angular/core';
import { RepositoriesStatisticsDataService } from '../services/repositories-statistics-data.service';
import { DataPersistence } from '@nrwl/angular';
import { Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { fromRepositoriesStatisticsActions } from './repositories-statistics.actions';
import { RepositoriesStatisticsPartialState } from '@pimp-my-pr/pmp-web/repository/repositories-statistics/data-access';

@Injectable()
export class RepositoriesStatisticsEffects {
  @Effect()
  getRepositoryStatisticsCollection$ = this.dp.fetch(
    fromRepositoriesStatisticsActions.Types.GetRepositoriesStatisticsCollection,
    {
      run: (action: fromRepositoriesStatisticsActions.GetRepositoriesStatisticsCollection) => {
        return this.repositoryStatisticsDataService
          .getRepositoryStatisticsCollection()
          .pipe(
            map(
              data =>
                new fromRepositoriesStatisticsActions.GetRepositoriesStatisticsCollectionSuccess(
                  data
                )
            )
          );
      },
      onError: (
        action: fromRepositoriesStatisticsActions.GetRepositoriesStatisticsCollection,
        error: HttpErrorResponse
      ) => {
        return new fromRepositoriesStatisticsActions.GetRepositoriesStatisticsCollectionFail(error);
      }
    }
  );

  constructor(
    private dp: DataPersistence<RepositoriesStatisticsPartialState>,
    private repositoryStatisticsDataService: RepositoriesStatisticsDataService
  ) {}
}
