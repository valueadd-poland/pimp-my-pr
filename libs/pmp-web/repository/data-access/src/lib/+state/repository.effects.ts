import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { RepositoryDataService } from '../services/repository-data.service';
import { fromRepositoryActions } from './repository.actions';
import { RepositoryPartialState } from './repository.reducer';

@Injectable()
export class RepositoryEffects {
  @Effect()
  getRepositoryCollection$ = this.dp.fetch(fromRepositoryActions.Types.GetRepositoryCollection, {
    run: (action: fromRepositoryActions.GetRepositoryCollection) => {
      return this.repositoryDataService
        .getRepositoryCollection()
        .pipe(map(data => new fromRepositoryActions.GetRepositoryCollectionSuccess(data)));
    },
    onError: (action: fromRepositoryActions.GetRepositoryCollection, error: HttpErrorResponse) => {
      return new fromRepositoryActions.GetRepositoryCollectionFail(error);
    }
  });
  @Effect()
  addRepository$ = this.dp.fetch(fromRepositoryActions.Types.AddRepository, {
    run: (action: fromRepositoryActions.AddRepository) => {
      return this.repositoryDataService
        .addRepository(action.payload)
        .pipe(map(() => new fromRepositoryActions.AddRepositorySuccess()));
    },
    onError: (action: fromRepositoryActions.AddRepository, error: HttpErrorResponse) => {
      return new fromRepositoryActions.AddRepositoryFail(error);
    }
  });
  @Effect()
  addRepositorySuccess$ = this.actions$.pipe(
    ofType(fromRepositoryActions.Types.AddRepositorySuccess),
    map(() => new fromRepositoryActions.GetRepositoryCollection())
  );
  @Effect()
  deleteRepository$ = this.dp.fetch(fromRepositoryActions.Types.DeleteRepository, {
    run: (action: fromRepositoryActions.DeleteRepository) => {
      return this.repositoryDataService
        .deleteRepository(action.payload)
        .pipe(map(() => new fromRepositoryActions.DeleteRepositorySuccess()));
    },
    onError: (action: fromRepositoryActions.DeleteRepository, error: HttpErrorResponse) => {
      return new fromRepositoryActions.DeleteRepositoryFail(error);
    }
  });
  @Effect()
  deleteRepositorySuccess$ = this.actions$.pipe(
    ofType(fromRepositoryActions.Types.DeleteRepositorySuccess),
    map(() => new fromRepositoryActions.GetRepositoryCollection())
  );
  @Effect()
  editRepository$ = this.dp.fetch(fromRepositoryActions.Types.EditRepository, {
    run: (action: fromRepositoryActions.EditRepository) => {
      return this.repositoryDataService
        .editRepository(action.payload)
        .pipe(map(() => new fromRepositoryActions.EditRepositorySuccess()));
    },
    onError: (action: fromRepositoryActions.EditRepository, error: HttpErrorResponse) => {
      return new fromRepositoryActions.EditRepositoryFail(error);
    }
  });
  @Effect()
  editRepositorySuccess$ = this.actions$.pipe(
    ofType(fromRepositoryActions.Types.EditRepositorySuccess),
    map(() => new fromRepositoryActions.GetRepositoryCollection())
  );

  constructor(
    private dp: DataPersistence<RepositoryPartialState>,
    private repositoryDataService: RepositoryDataService,
    private actions$: Actions
  ) {}
}
