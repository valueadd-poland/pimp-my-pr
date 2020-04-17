import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthFacade } from '@pimp-my-pr/pmp-web/auth/data-access';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authFacade: AuthFacade) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!!next.queryParams['code']) {
      const authCode = next.queryParams['code'];
      return this.authFacade.login(authCode).pipe(first());
    } else {
      return of(true);
    }
  }
}
