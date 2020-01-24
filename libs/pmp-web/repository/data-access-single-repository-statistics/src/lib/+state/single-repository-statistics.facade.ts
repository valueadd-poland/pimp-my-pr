import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SingleRepositoryStatisticsPartialState } from './single-repository-statistics.reducer';
import { singleRepositoryStatisticsQuery } from './single-repository-statistics.selectors';
import { fromSingleRepositoryStatisticsActions } from './single-repository-statistics.actions';
import { GetRepositoryStatisticsRequestPayload } from '../resources/request-payloads/get-repository-statistics.request-payload';

@Injectable()
export class SingleRepositoryStatisticsFacade {
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

  getRepositoryStatistics(data: GetRepositoryStatisticsRequestPayload): void {
    this.store.dispatch(new fromSingleRepositoryStatisticsActions.GetRepositoryStatistics(data));
  }
}
