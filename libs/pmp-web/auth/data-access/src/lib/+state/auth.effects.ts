import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { AuthPartialState } from './auth.reducer';
import { fromAuthActions } from './auth.actions';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthDataService } from '../services/auth-data.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginSuccessPayload } from '@pimp-my-pr/shared/domain';

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

  constructor(
    private dp: DataPersistence<AuthPartialState>,
    private actions$: Actions,
    private router: Router,
    private authDataService: AuthDataService
  ) {}
}
