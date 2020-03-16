import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { RepositoriesStatisticsPartialState } from '@pimp-my-pr/pmp-web/repository/repositories-statistics/data-access';
import { map } from 'rxjs/operators';
import { RepositoriesStatisticsDataService } from '../services/repositories-statistics-data.service';
import { fromRepositoriesStatisticsActions } from './repositories-statistics.actions';

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
