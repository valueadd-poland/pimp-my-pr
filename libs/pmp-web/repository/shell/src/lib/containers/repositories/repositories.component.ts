import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthPublicFacade } from '@pimp-my-pr/pmp-web/auth/public';

@Component({
  selector: 'pmp-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoriesComponent {
  id = '1223';
  name = 'Artix1500';
  avatar = 'https://avatars1.githubusercontent.com/u/38567097?s=460&v=4';

  constructor(private authPublicFacade: AuthPublicFacade) {}

  onLogout(): void {
    this.authPublicFacade.logout();
  }
}
