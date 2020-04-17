import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AddRepositoryPayload } from '@pimp-my-pr/pmp-web/repository/domain';
import { fromRepositoryActions } from './repository.actions';
import { RepositoryPartialState } from './repository.reducer';
import { repositoryQuery } from './repository.selectors';

@Injectable()
export class RepositoryFacade {
  repositoryCollection$ = this.store.pipe(select(repositoryQuery.getRepositoryCollection));
  constructor(private store: Store<RepositoryPartialState>) {}

  getRepositoryCollection(): void {
    this.store.dispatch(new fromRepositoryActions.GetRepositoryCollection());
  }

  addRepository(data: AddRepositoryPayload): void {
    this.store.dispatch(new fromRepositoryActions.AddRepository(data));
  }
}
