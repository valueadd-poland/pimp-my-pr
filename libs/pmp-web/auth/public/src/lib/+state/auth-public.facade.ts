import { Injectable } from '@angular/core';
import { AuthFacade } from '@pimp-my-pr/pmp-web/auth/data-access';
import { AuthFeatureFacade } from '@pimp-my-pr/pmp-web/auth/feature';

@Injectable({
  providedIn: 'root'
})
export class AuthPublicFacade {
  constructor(private authFacade: AuthFacade, private authFeatureFacade: AuthFeatureFacade) {}

  logout(): void {
    this.authFacade.logout();
  }

  loginRememberedUserOrGoToLogin(): void {
    this.authFeatureFacade.loginRememberedUserOrGoToLogin();
  }
}
