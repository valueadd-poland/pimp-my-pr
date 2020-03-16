import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetRepositoryStatisticsPayload } from '@pimp-my-pr/pmp-web/repository/domain';
import { fromSingleRepositoryStatisticsActions } from './repository-statistics.actions';
import { SingleRepositoryStatisticsPartialState } from './repository-statistics.reducer';
import { singleRepositoryStatisticsQuery } from './repository-statistics.selectors';

@Injectable()
export class RepositoryStatisticsFacade {
  repositoryStatistics$ = this.store.pipe(
    select(singleRepositoryStatisticsQuery.getRepositoryStatistics)
  );
  repositoryStatisticsLoading$ = this.store.pipe(
    select(singleRepositoryStatisticsQuery.getRepositoryStatisticsLoading)
  );
  repositoryStatisticsLoadError$ = this.store.pipe(
    select(singleRepositoryStatisticsQuery.getRepositoryStatisticsLoadError)
  );
  constructor(private store: Store<SingleRepositoryStatisticsPartialState>) {}

  getRepositoryStatistics(data: GetRepositoryStatisticsPayload): void {
    this.store.dispatch(new fromSingleRepositoryStatisticsActions.GetRepositoryStatistics(data));
  }
}
