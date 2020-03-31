import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthFacade } from '@pimp-my-pr/pmp-web/auth/data-access';
import { fromAuthFeatureActions } from './auth-feature.actions';

@Injectable()
export class AuthFeatureEffects {
  @Effect({ dispatch: false })
  redirectAfterLogin$ = this.actions$.pipe(
    ofType(fromAuthFeatureActions.Types.RedirectAfterLogin),
    tap(() => {
      this.router.navigate(['/user']);
    })
  );

  constructor(private actions$: Actions, private authFacade: AuthFacade, private router: Router) {}
}
