import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RepositoryStatisticsFacade } from '@pimp-my-pr/pmp-web/repository/data-access-repository-statistics';
import { RepositoryStatistics } from '@pimp-my-pr/shared/domain';
import { RepositoriesStatisticsPresenter } from './repositories-statistics.presenter';
import { Observable } from 'rxjs';

@Component({
  selector: 'pmp-repositories-statistics',
  templateUrl: './repositories-statistics.component.html',
  styleUrls: ['./repositories-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RepositoriesStatisticsPresenter]
})
export class RepositoriesStatisticsComponent implements OnInit, OnDestroy {
  repositoryStatisticsCollection$: Observable<RepositoryStatistics[]> = this
    .repositoryStatisticsFacade.repositoryStatisticsCollection$;

  constructor(
    private repositoryStatisticsFacade: RepositoryStatisticsFacade,
    private repositoriesStatisticsPresenter: RepositoriesStatisticsPresenter
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.repositoryStatisticsFacade.getRepositoryStatisticsCollection();
  }

  onNavigateToRepository(repository: RepositoryStatistics): void {
    this.repositoriesStatisticsPresenter.navigateToRepository(repository.id);
  }
}
