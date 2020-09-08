import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  AddRepositoryPayload,
  DeleteRepositoryPayload,
  EditRepositoryPayload
} from '@pimp-my-pr/pmp-web/repository/domain';
import { fromRepositoryActions } from './repository.actions';
import { RepositoryPartialState } from './repository.reducer';
import { repositoryQuery } from './repository.selectors';
import { ActionStatusResolverService } from '@pimp-my-pr/pmp-web/shared/util-ngrx';
import { Observable } from 'rxjs';
import { AddRepositorySuccessPayload } from '@pimp-my-pr/pmp-web/repository/domain';

@Injectable()
export class RepositoryFacade {
  repositoryCollection$ = this.store.pipe(select(repositoryQuery.getRepositoryCollection));
  repositoryCollectionLoading$ = this.store.pipe(
    select(repositoryQuery.getRepositoryCollectionLoading)
  );
  constructor(
    private store: Store<RepositoryPartialState>,
    private actionStatusResolverService: ActionStatusResolverService
  ) {}

  getRepositoryCollection(): void {
    this.store.dispatch(new fromRepositoryActions.GetRepositoryCollection());
  }

  addRepository(data: AddRepositoryPayload): Observable<AddRepositorySuccessPayload> {
    return this.actionStatusResolverService.resolve<AddRepositorySuccessPayload>(
      new fromRepositoryActions.AddRepository(data),
      fromRepositoryActions.Types.AddRepositorySuccess,
      fromRepositoryActions.Types.AddRepositoryFail
    );
  }

  deleteRepository(data: DeleteRepositoryPayload): Observable<void> {
    return this.actionStatusResolverService.resolve(
      new fromRepositoryActions.DeleteRepository(data),
      fromRepositoryActions.Types.DeleteRepositorySuccess,
      fromRepositoryActions.Types.DeleteRepositoryFail
    );
  }

  editRepository(data: EditRepositoryPayload): Observable<void> {
    return this.actionStatusResolverService.resolve(
      new fromRepositoryActions.EditRepository(data),
      fromRepositoryActions.Types.EditRepositorySuccess,
      fromRepositoryActions.Types.EditRepositoryFail
    );
  }
}
