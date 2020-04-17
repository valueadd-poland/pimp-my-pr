import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthPublicFacade } from '@pimp-my-pr/pmp-web/auth/public';

@Component({
  selector: 'pmp-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoriesComponent {
  constructor(private authPublicFacade: AuthPublicFacade) {}

  onLogout(): void {
    this.authPublicFacade.logout();
  }
}
