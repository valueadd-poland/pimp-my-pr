import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { first, mapTo, switchMap, tap } from 'rxjs/operators';

import { AuthFacade } from '@pimp-my-pr/pmp-web/auth/data-access';
import { User } from '@pimp-my-pr/shared/domain';

import { AuthPublicFacade } from '../+state/auth-public.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthPublicGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private authPublicFacade: AuthPublicFacade) {}

  canActivate(): Observable<boolean> {
    return this.authFacade.authToken$.pipe(
      tap((token: string) => {
        if (!token) {
          this.authPublicFacade.loginRememberedUserOrGoToLogin();
        }
      }),
      first((token: string) => !!token),
      switchMap(() => this.authPublicFacade.user$),
      tap((user: User) => {
        if (!user) {
          this.authPublicFacade.getUser();
        }
      }),
      first((user: User) => !!user),
      mapTo(true)
    );
  }
}
