import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthPublicFacade } from '@pimp-my-pr/pmp-web/auth/public';
import { User } from '@pimp-my-pr/shared/domain';

@Component({
  selector: 'pmp-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoriesComponent implements OnInit {
  user: Observable<User>;

  constructor(private authPublicFacade: AuthPublicFacade) {}

  ngOnInit(): void {
    this.user = this.authPublicFacade.user$;
  }

  onLogout(): void {
    this.authPublicFacade.logout();
  }
}
