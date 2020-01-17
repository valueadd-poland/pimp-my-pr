import { Injectable } from '@angular/core';
import { RepositoryStatistics } from '@pimp-my-pr/shared/domain';
import { TableConfig } from '@pimp-my-pr/pmp-web/shared/domain';
import { Router } from '@angular/router';

@Injectable()
export class RepositoriesStatisticsPresenter {
  constructor(private router: Router) {}

  initTableConfig(data: RepositoryStatistics[]): TableConfig<RepositoryStatistics[]> {
    return {
      columns: [
        { name: 'repository', property: 'name', label: 'Repository' },
        {
          name: 'pendingPrs',
          property: 'pendingPrs',
          label: 'Pending PR',
          isOrderColumn: true
        },
        {
          name: 'sumOfHoursPrsWaiting',
          property: 'sumOfHoursPrsWaiting',
          label: 'Sum of time PR waiting'
        },
        {
          name: 'linesOfCodeToCheck',
          property: 'linesOfCodeToCheck',
          label: 'To check [lines of code]'
        },
        {
          name: 'longestPrLinesOfCode',
          property: 'longestPrLinesOfCode',
          label: 'Longest PR [lines of code]'
        }
      ],
      data: data
    };
  }

  navigateToRepository(repositoryId: number): void {
    this.router.navigate(['repositories', repositoryId]);
  }
}
