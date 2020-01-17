import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RepositoryStatisticsPartialState } from './repository-statistics.reducer';
import { fromRepositoryStatisticsActions } from './repository-statistics.actions';
import { repositoryStatisticsQuery } from './repository-statistics.selectors';

@Injectable()
export class RepositoryStatisticsFacade {
  repositoryStatisticsCollection$ = this.store.pipe(
    select(repositoryStatisticsQuery.getRepositoryStatisticsCollection)
  );
  repositoryStatisticsCollectionLoading$ = this.store.pipe(
    select(repositoryStatisticsQuery.getRepositoryStatisticsCollectionLoading)
  );
  repositoryStatisticsCollectionLoadError$ = this.store.pipe(
    select(repositoryStatisticsQuery.getRepositoryStatisticsCollectionLoadError)
  );

  constructor(private store: Store<RepositoryStatisticsPartialState>) {}

  getRepositoryStatisticsCollection(): void {
    this.store.dispatch(new fromRepositoryStatisticsActions.GetRepositoryStatisticsCollection());
  }
}
