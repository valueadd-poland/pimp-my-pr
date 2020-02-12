import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RepositoryStatistics } from '@pimp-my-pr/shared/domain';
import { RepositoriesStatisticsPresenter } from './repositories-statistics.presenter';
import { RepositoriesStatisticsFacade } from '@pimp-my-pr/pmp-web/report/repositories-statistics/data-access';

@Component({
  selector: 'pmp-repositories-statistics',
  templateUrl: './repositories-statistics.component.html',
  styleUrls: ['./repositories-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RepositoriesStatisticsPresenter]
})
export class RepositoriesStatisticsComponent implements OnInit {
  repositoryStatisticsCollection$ = this.repositoryStatisticsFacade.repositoryStatisticsCollection$;
  repositoryStatisticsCollectionLoading$ = this.repositoryStatisticsFacade
    .repositoryStatisticsCollectionLoading$;

  constructor(
    private repositoryStatisticsFacade: RepositoriesStatisticsFacade,
    private repositoriesStatisticsPresenter: RepositoriesStatisticsPresenter
  ) {}

  ngOnInit(): void {
    this.repositoryStatisticsFacade.getRepositoryStatisticsCollection();
  }

  onNavigateToRepository(repository: RepositoryStatistics): void {
    this.repositoriesStatisticsPresenter.navigateToRepository(repository);
  }
}
