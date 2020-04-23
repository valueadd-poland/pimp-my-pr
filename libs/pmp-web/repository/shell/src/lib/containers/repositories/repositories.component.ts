import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthPublicFacade } from '@pimp-my-pr/pmp-web/auth/public';
import { User } from '@pimp-my-pr/shared/domain';
import { Observable } from 'rxjs';

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
    this.authPublicFacade.getUser();
  }

  onLogout(): void {
    this.authPublicFacade.logout();
  }
}
