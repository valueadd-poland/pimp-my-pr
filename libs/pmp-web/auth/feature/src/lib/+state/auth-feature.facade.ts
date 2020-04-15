import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@pimp-my-pr/pmp-web/auth/data-access';

@Injectable({
  providedIn: 'root'
})
export class AuthFeatureFacade {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  loginRememberedUserOrGoToLogin(): void {
    const savedToken = this.authFacade.getSavedToken();
    if (!!savedToken) {
      this.authFacade.applyToken(savedToken);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
