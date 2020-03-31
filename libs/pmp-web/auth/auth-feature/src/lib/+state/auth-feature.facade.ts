import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { fromAuthFeatureActions } from './auth-feature.actions';
import { AuthFeaturePartialState } from '@pimp-my-pr/pmp-web/auth/auth-feature';

@Injectable()
export class AuthFeatureFacade {
  constructor(private router: Router, private store: Store<AuthFeaturePartialState>) {}

  redirectAfterLogin(): void {
    this.store.dispatch(new fromAuthFeatureActions.RedirectAfterLogin());
  }
}
