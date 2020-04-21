import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthFacade } from '@pimp-my-pr/pmp-web/auth/data-access';
import { from, Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!!next.queryParams['code'] && !!next.queryParams['platform']) {
      const authCode = next.queryParams['code'];
      const platform = next.queryParams['platform'];
      return this.authFacade.login(authCode, platform).pipe(first());
    } else {
      if (!!this.authFacade.getSavedToken()) {
        return from(this.router.navigate(['/user']));
      }
      return of(true);
    }
  }
}
