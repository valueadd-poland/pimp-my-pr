import { Injectable } from '@angular/core';
import { RepositoryStatisticsDataService } from '../services/repository-statistics-data.service';
import { RepositoryStatisticsPartialState } from '@pimp-my-pr/pmp-web/repository/data-access-repository-statistics';
import { DataPersistence } from '@nrwl/angular';
import { Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { fromRepositoryStatisticsActions } from './repository-statistics.actions';

@Injectable()
export class RepositoryStatisticsEffects {
  @Effect()
  getRepositoryStatisticsCollection$ = this.dp.fetch(
    fromRepositoryStatisticsActions.Types.GetRepositoryStatisticsCollection,
    {
      run: (action: fromRepositoryStatisticsActions.GetRepositoryStatisticsCollection) => {
        return this.repositoryStatisticsDataService
          .getRepositoryStatisticsCollection()
          .pipe(
            map(
              data =>
                new fromRepositoryStatisticsActions.GetRepositoryStatisticsCollectionSuccess(data)
            )
          );
      },
      onError: (
        action: fromRepositoryStatisticsActions.GetRepositoryStatisticsCollection,
        error: HttpErrorResponse
      ) => {
        return new fromRepositoryStatisticsActions.GetRepositoryStatisticsCollectionFail(error);
      }
    }
  );

  constructor(
    private dp: DataPersistence<RepositoryStatisticsPartialState>,
    private repositoryStatisticsDataService: RepositoryStatisticsDataService
  ) {}
}
