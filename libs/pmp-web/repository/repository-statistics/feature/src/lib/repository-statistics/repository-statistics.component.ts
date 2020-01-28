import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { RepositoryStatisticsFacade } from '@pimp-my-pr/pmp-web/repository/repository-statistics/data-access';
import { PrStatistics } from '@pimp-my-pr/shared/domain';

@Component({
  selector: 'pimp-my-pr-repository-statistics',
  templateUrl: './repository-statistics.component.html',
  styleUrls: ['./repository-statistics.component.scss']
})
export class RepositoryStatisticsComponent implements OnDestroy, OnInit {
  repositoryId: number | null;
  repository$ = this.facade.repositoryStatistics$;

  constructor(private route: ActivatedRoute, private facade: RepositoryStatisticsFacade) {}

  ngOnDestroy(): void {}

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
}
