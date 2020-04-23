import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { LoginSuccessPayload } from '@pimp-my-pr/shared/domain';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthDataService } from '../services/auth-data.service';
import { fromAuthActions } from './auth.actions';
import { AuthPartialState } from './auth.reducer';
import { GetUserSuccessPayload } from '@pimp-my-pr/pmp-web/auth/domain';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.dp.fetch(fromAuthActions.Types.Login, {
    run: (action: fromAuthActions.Login, state: AuthPartialState) =>
      this.authDataService.login(action.payload).pipe(
        switchMap((res: LoginSuccessPayload) => {
          this.authDataService.saveToken(res.token);
          return of(new fromAuthActions.LoginSuccess(res));
        })
      ),
    onError: (action: fromAuthActions.Login, error: HttpErrorResponse) => {
      return new fromAuthActions.LoginFail(error);
    }
  });

  @Effect()
  getUser$ = this.dp.fetch(fromAuthActions.Types.GetUser, {
    run: (action: fromAuthActions.GetUser, state: AuthPartialState) =>
      this.authDataService.getUser().pipe(
        switchMap((res: GetUserSuccessPayload) => {
          return of(new fromAuthActions.GetUserSuccess(res));
        })
      ),
    onError: (action: fromAuthActions.GetUser, error: HttpErrorResponse) => {
      return new fromAuthActions.GetUserFail(error);
    }
  });

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(fromAuthActions.Types.Logout),
    tap(() => {
      this.authDataService.clearSavedToken();
    })
  );

  constructor(
    private dp: DataPersistence<AuthPartialState>,
    private actions$: Actions,
    private router: Router,
    private authDataService: AuthDataService
  ) {}
}
