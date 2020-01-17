import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { RepositoryStatisticsFacade } from '@pimp-my-pr/pmp-web/repository/data-access-repository-statistics';
import { RepositoryStatistics } from '@pimp-my-pr/shared/domain';
import { TableConfig } from '@pimp-my-pr/pmp-web/shared/domain';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { RepositoriesStatisticsPresenter } from './repositories-statistics.presenter';

@Component({
  selector: 'pimp-my-pr-repositories-statistics',
  templateUrl: './repositories-statistics.component.html',
  styleUrls: ['./repositories-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RepositoriesStatisticsPresenter]
})
export class RepositoriesStatisticsComponent implements OnInit, OnDestroy {
  tableConfig: TableConfig<RepositoryStatistics[]>;

  constructor(
    private cdr: ChangeDetectorRef,
    private repositoryStatisticsFacade: RepositoryStatisticsFacade,
    private repositoriesStatisticsPresenter: RepositoriesStatisticsPresenter
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.repositoryStatisticsFacade.repositoryStatisticsCollection$
      .pipe(untilDestroyed(this))
      .subscribe(repositoryStatistics => {
        this.tableConfig = this.repositoriesStatisticsPresenter.initTableConfig(
          repositoryStatistics
        );
        this.cdr.markForCheck();
      });
    this.repositoryStatisticsFacade.getRepositoryStatisticsCollection();
  }

  onNavigateToRepository(repository: RepositoryStatistics): void {
    this.repositoriesStatisticsPresenter.navigateToRepository(repository.id);
  }
}
