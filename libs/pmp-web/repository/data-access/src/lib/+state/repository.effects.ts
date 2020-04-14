import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { RepositoryPartialState } from './repository.reducer';
import { RepositoryDataService } from '../services/repository-data.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { fromRepositoryActions } from './repository.actions';

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

  constructor(
    private dp: DataPersistence<RepositoryPartialState>,
    private repositoryDataService: RepositoryDataService,
    private actions$: Actions
  ) {}
}
