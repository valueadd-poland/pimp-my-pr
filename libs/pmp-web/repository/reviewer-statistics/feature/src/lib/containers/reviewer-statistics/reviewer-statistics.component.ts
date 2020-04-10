import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewerStatisticsFacade } from '@pimp-my-pr/pmp-web/repository/reviewer-statistics/data-access';
import { PrStatistics } from '@pimp-my-pr/shared/domain';
import { first } from 'rxjs/operators';

@Component({
  selector: 'pmp-reviewer-statistics',
  templateUrl: './reviewer-statistics.component.html',
  styleUrls: ['./reviewer-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewerStatisticsComponent implements OnInit {
  reviewerName: string | null = null;
  userAvatarUrl: string | null = null;
  userStatistics$ = this.facade.reviewerStatistics$;
  userStatisticsLoading$ = this.facade.reviewerStatisticsResponseLoading$;

  constructor(
    private facade: ReviewerStatisticsFacade,
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
      this.reviewerName = params.reviewerName;
      this.facade.getReviewerStatisticsResponse({ reviewerName: this.reviewerName });
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
