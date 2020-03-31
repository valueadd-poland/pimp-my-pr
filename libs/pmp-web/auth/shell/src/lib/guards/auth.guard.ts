import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthFacade } from '@pimp-my-pr/pmp-web/auth/data-access';
import { first, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthFeatureFacade } from '@pimp-my-pr/pmp-web/auth/auth-feature';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private authFeatureFacade: AuthFeatureFacade) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!!next.queryParams['code']) {
      const authCode = next.queryParams['code'];
      return this.authFacade.login(authCode).pipe(
        first(),
        tap(() => {
          this.authFeatureFacade.redirectAfterLogin();
        })
      );
    } else {
      return of(true);
    }
  }
}
