import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActionStatusResolverService } from '@pimp-my-pr/pmp-web/shared/util-ngrx';
import { Platform } from '@pimp-my-pr/shared/domain';
import { Observable } from 'rxjs';
import { AuthDataService } from '../services/auth-data.service';
import { fromAuthActions } from './auth.actions';
import { AuthPartialState } from './auth.reducer';
import { authQuery } from './auth.selectors';

@Injectable()
export class AuthFacade {
  authToken$ = this.store.pipe(select(authQuery.getAuthToken));
  loginInProgress$ = this.store.pipe(select(authQuery.getLoginInProgress));

  constructor(
    private authDataService: AuthDataService,
    private store: Store<AuthPartialState>,
    private actionStatusResolverService: ActionStatusResolverService
  ) {}

  applyToken(token: string): void {
    this.store.dispatch(new fromAuthActions.ApplyToken({ token }));
  }

  login(authCode: string, platform: Platform): Observable<boolean> {
    return this.actionStatusResolverService.resolve(
      new fromAuthActions.Login({ code: authCode, platform }),
      fromAuthActions.Types.LoginSuccess,
      fromAuthActions.Types.LoginFail
    );
  }

  logout(): void {
    this.store.dispatch(new fromAuthActions.Logout());
  }

  getSavedToken(): string {
    return this.authDataService.getToken();
  }
}
