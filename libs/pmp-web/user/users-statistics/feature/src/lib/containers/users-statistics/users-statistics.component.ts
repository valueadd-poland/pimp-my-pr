import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserStatistics } from '@pimp-my-pr/shared/domain';
import { UserFacade } from '@pimp-my-pr/pmp-web/user/data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'pmp-users-statistics',
  templateUrl: './users-statistics.component.html',
  styleUrls: ['./users-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersStatisticsComponent implements OnInit {
  userStatisticsCollection$ = this.userFacade.userStatisticsCollection$;
  userStatisticsCollectionLoading$ = this.userFacade.userStatisticsCollectionLoading$;

  constructor(private router: Router, private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.userFacade.getUserStatisticsCollection({});
  }

  onNavigateToUser(userStatistics: UserStatistics): void {
    this.router.navigate(['user', userStatistics.name], {
      state: { avatarUrl: userStatistics.avatarUrl }
    });
  }
}
