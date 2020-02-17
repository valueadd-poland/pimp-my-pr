import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { RepositoryStatisticsFacade } from '@pimp-my-pr/pmp-web/repository/repository-statistics/data-access';
import { PrStatistics } from '@pimp-my-pr/shared/domain';

@Component({
  selector: 'pimp-my-pr-repository-statistics',
  templateUrl: './repository-statistics.component.html',
  styleUrls: ['./repository-statistics.component.scss']
})
export class RepositoryStatisticsComponent implements OnInit {
  repositoryId: number | null = null;
  repositoryName: string | null = null;
  repositoryPictureUrl: string | null = null;
  repository$ = this.facade.repositoryStatistics$;
  repositoryLoading$ = this.facade.repositoryStatisticsLoading$;

  constructor(
    private facade: RepositoryStatisticsFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initRepositoryInfoFromNavigation();
  }

  ngOnInit(): void {
    this.initGetRepositoryStatistics();
  }

  onNavigateItem(prStatistics: PrStatistics): void {
    window.open(prStatistics.url, '_blank');
  }

  private initGetRepositoryStatistics(): void {
    this.route.params.pipe(first()).subscribe(params => {
      this.repositoryId = params.repositoryId;
      this.facade.getRepositoryStatistics({ id: this.repositoryId });
    });
  }

  private initRepositoryInfoFromNavigation(): void {
    if (!this.router.getCurrentNavigation() || !this.router.getCurrentNavigation().extras.state) {
      return;
    }

    const routerNavigationState = this.router.getCurrentNavigation().extras.state;
    this.repositoryName = routerNavigationState.name;
    this.repositoryPictureUrl = routerNavigationState.pictureUrl;
  }
}
