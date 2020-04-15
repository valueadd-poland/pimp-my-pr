import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthFacade } from '@pimp-my-pr/pmp-web/auth/data-access';
import { first, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthPublicFacade } from '../+state/auth-public.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthPublicGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private authPublicFacade: AuthPublicFacade) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authFacade.authToken$.pipe(
      first(),
      tap((token: string) => {
        if (!token) {
          this.authPublicFacade.loginRememberedUserOrGoToLogin();
        }
      }),
      map(token => !!token)
    );
  }
}
