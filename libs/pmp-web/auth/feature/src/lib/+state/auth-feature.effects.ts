import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fromAuthActions } from '@pimp-my-pr/pmp-web/auth/data-access';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthFeatureEffects {
  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(fromAuthActions.Types.LoginSuccess),
    tap(() => {
      this.router.navigate(['/user']);
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(fromAuthActions.Types.Logout),
    tap(() => {
      this.router.navigate(['/login']);
    })
  );

  constructor(private actions$: Actions, private router: Router) {}
}
