import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewerStatisticsFacade } from '@pimp-my-pr/pmp-web/repository/reviewer-statistics/data-access';
import { PrStatistics, RepositoryModel } from '@pimp-my-pr/shared/domain';
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

  trackRepositories(index: number, repository: RepositoryModel): string {
    return repository.id;
  }

  private initGetUserStatistics(): void {
    this.route.params.pipe(first()).subscribe(params => {
      this.facade.getReviewerStatistics({ id: params.id });
    });
  }

  private initUserInfoRouterNavigation(): void {
    const currentNavigation = this.router.getCurrentNavigation();

    if (!currentNavigation || !currentNavigation.extras.state) {
      return;
    }

    const routerNavigationState = currentNavigation.extras.state;
    this.reviewerName = routerNavigationState.reviewerName;
    this.userAvatarUrl = routerNavigationState.avatarUrl;
  }
}
