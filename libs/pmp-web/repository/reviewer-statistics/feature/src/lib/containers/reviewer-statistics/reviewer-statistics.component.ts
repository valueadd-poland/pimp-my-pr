import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewerStatisticsFacade } from '@pimp-my-pr/pmp-web/repository/reviewer-statistics/data-access';
import {
  PrRepoIndexStatistics,
  PrStatistics,
  RepositoryModel,
  ReviewerModel
} from '@pimp-my-pr/shared/domain';
import { filter, first } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'pmp-reviewer-statistics',
  templateUrl: './reviewer-statistics.component.html',
  styleUrls: ['./reviewer-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewerStatisticsComponent implements OnInit, OnDestroy {
  filtersMap: { [id: string]: boolean }[] = [];
  reviewerName: string | null = null;
  selectedRepositories: RepositoryModel[] = [];
  selectedRepositoriesPrs: PrRepoIndexStatistics[];
  userAvatarUrl: string | null = null;
  userStatistics$ = this.facade.reviewerStatistics$;
  userStatistics: ReviewerModel;
  userStatisticsLoading$ = this.facade.reviewerStatisticsResponseLoading$;

  constructor(
    private facade: ReviewerStatisticsFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initUserInfoRouterNavigation();
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.initGetUserStatistics();
    this.initGetSelectedRepositories();
  }

  onNavigateItem(prStatistics: PrStatistics): void {
    window.open(prStatistics.url, '_blank');
  }

  trackRepositories(index: number, repository: RepositoryModel): string {
    return repository.id;
  }

  onSelectRepository(repository: RepositoryModel): void {
    this.selectedRepositories.includes(repository)
      ? this.removeSelectedRepository(repository)
      : this.addSelectedRepository(repository);
  }

  private addSelectedRepository(repository: RepositoryModel): void {
    this.filtersMap[repository.fullName] = true;
    this.facade.addSelectedRepository(repository);
  }

  private removeSelectedRepository(repository: RepositoryModel): void {
    this.filtersMap[repository.fullName] = false;
    this.facade.removeSelectedRepository(repository);
  }

  private refreshSelectedRepositoriesPrs(): void {
    this.selectedRepositoriesPrs = [];
    this.filtersMap = [];

    this.selectedRepositories.forEach((repository, index) => {
      this.filtersMap[repository.fullName] = true;
      this.selectedRepositoriesPrs.push(
        ...repository.prsStatistics.map(prStatistic => ({
          ...prStatistic,
          repositoryIndex: index
        }))
      );
    });
  }

  private initGetUserStatistics(): void {
    this.route.params.pipe(first()).subscribe(params => {
      this.facade.getReviewerStatistics({ id: params.id });
      this.facade.reviewerStatistics$
        .pipe(
          filter(statistics => !!statistics),
          untilDestroyed(this)
        )
        .subscribe(statistics => (this.userStatistics = statistics));
    });
  }

  private initGetSelectedRepositories(): void {
    this.facade.selectedRepositories$.pipe(untilDestroyed(this)).subscribe(selectedRepositories => {
      this.selectedRepositories = selectedRepositories;
      this.refreshSelectedRepositoriesPrs();
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
