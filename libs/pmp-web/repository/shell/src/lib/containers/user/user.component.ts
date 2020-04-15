import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthPublicFacade } from '@pimp-my-pr/pmp-web/auth/public';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  constructor(private authPublicFacade: AuthPublicFacade) {}

  onLogout(): void {
    this.authPublicFacade.logout();
  }
}
