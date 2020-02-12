import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { PrStatistics } from '@pimp-my-pr/shared/domain';
import { SingleUserStatisticsFacade } from '@pimp-my-pr/pmp-web/report/single-user-statistics/data-access';

@Component({
  selector: 'pmp-single-user-statistics',
  templateUrl: './single-user-statistics.component.html',
  styleUrls: ['./single-user-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleUserStatisticsComponent implements OnInit {
  userName: string | null = null;
  userAvatarUrl: string | null = null;
  userStatistics$ = this.facade.singleUserStatisticsResponse$;
  userStatisticsLoading$ = this.facade.singleUserStatisticsResponseLoading$;

  constructor(
    private facade: SingleUserStatisticsFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initUserInfoRouterNavigation();
  }

  ngOnInit(): void {
    this.initGetUserStatistics();
  }

  onNavigateItem(prStatistics: PrStatistics): void {
    window.open(prStatistics.url, '_blank');
  }

  private initGetUserStatistics(): void {
    this.route.params.pipe(first()).subscribe(params => {
      this.userName = params.userName;
      this.facade.getSingleUserStatisticsResponse({ username: this.userName });
    });
  }

  private initUserInfoRouterNavigation(): void {
    if (!this.router.getCurrentNavigation() || !this.router.getCurrentNavigation().extras.state) {
      return;
    }

    const routerNavigationState = this.router.getCurrentNavigation().extras.state;
    this.userAvatarUrl = routerNavigationState.avatarUrl;
  }
}
