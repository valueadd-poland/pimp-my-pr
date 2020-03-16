import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromRepositoriesStatisticsActions } from './repositories-statistics.actions';
import { RepositoriesStatisticsPartialState } from './repositories-statistics.reducer';
import { repositoryStatisticsQuery } from './repositories-statistics.selectors';

@Injectable()
export class RepositoriesStatisticsFacade {
  repositoryStatisticsCollection$ = this.store.pipe(
    select(repositoryStatisticsQuery.getRepositoryStatisticsCollection)
  );
  repositoryStatisticsCollectionLoading$ = this.store.pipe(
    select(repositoryStatisticsQuery.getRepositoryStatisticsCollectionLoading)
  );
  repositoryStatisticsCollectionLoadError$ = this.store.pipe(
    select(repositoryStatisticsQuery.getRepositoryStatisticsCollectionLoadError)
  );

  constructor(private store: Store<RepositoriesStatisticsPartialState>) {}

  getRepositoryStatisticsCollection(): void {
    this.store.dispatch(
      new fromRepositoriesStatisticsActions.GetRepositoriesStatisticsCollection()
    );
  }
}
