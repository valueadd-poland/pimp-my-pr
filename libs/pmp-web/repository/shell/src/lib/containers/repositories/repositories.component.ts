import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { AuthPublicFacade } from '@pimp-my-pr/pmp-web/auth/public';
import { User } from '@pimp-my-pr/shared/domain';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pmp-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoriesComponent implements OnInit, OnDestroy {
  user: User;
  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(private authPublicFacade: AuthPublicFacade) {}

  ngOnInit(): void {
    this.authPublicFacade
      .getUser()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(user => (this.user = user));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onLogout(): void {
    this.authPublicFacade.logout();
  }
}
