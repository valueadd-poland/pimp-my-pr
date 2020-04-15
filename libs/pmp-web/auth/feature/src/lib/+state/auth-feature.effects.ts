import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { fromAuthActions } from '@pimp-my-pr/pmp-web/auth/data-access';

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
