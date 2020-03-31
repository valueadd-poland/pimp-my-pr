import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthPartialState } from './auth.reducer';
import { fromAuthActions } from './auth.actions';
import { Observable } from 'rxjs';
import { authQuery } from './auth.selectors';
import { AuthDataService } from '../services/auth-data.service';
import { ActionStatusResolverService } from '@pimp-my-pr/pmp-web/shared/core';

@Injectable()
export class AuthFacade {
  authToken$ = this.store.pipe(select(authQuery.getAuthToken));
  loginInProgress$ = this.store.pipe(select(authQuery.getLoginInProgress));

  constructor(
    private authDataService: AuthDataService,
    private store: Store<AuthPartialState>,
    private actionStatusResolverService: ActionStatusResolverService
  ) {}

  login(authCode: string): Observable<boolean> {
    return this.actionStatusResolverService.resolve(
      new fromAuthActions.Login({ code: authCode, platform: 'github' }),
      fromAuthActions.Types.LoginSuccess,
      fromAuthActions.Types.LoginFail
    );
  }

  setTokenFromStorage(): void {
    this.store.dispatch(new fromAuthActions.SetTokenFromStorage(this.getSavedToken()));
  }

  getSavedToken(): string {
    return this.authDataService.getToken();
  }
}
