import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UserStatistics } from '@pimp-my-pr/shared/domain';
import { UserFacade } from '@pimp-my-pr/pmp-web/user/data-access';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'pmp-users-statistics',
  templateUrl: './users-statistics.component.html',
  styleUrls: ['./users-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersStatisticsComponent implements OnInit, OnDestroy {
  userStatisticsCollection$: Observable<UserStatistics[]> = this.userFacade
    .userStatisticsCollection$;

  constructor(private router: Router, private userFacade: UserFacade) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.userFacade.getUserStatisticsCollection({});
  }

  onNavigateToUser(userStatistics: UserStatistics): void {
    this.router.navigate(['user', userStatistics.name]);
  }
}
