import { Injectable } from '@angular/core';
import { RepositoryStatistics } from '@pimp-my-pr/shared/domain';
import { TableConfig } from '@pimp-my-pr/pmp-web/shared/domain';
import { Router } from '@angular/router';

@Injectable()
export class RepositoriesStatisticsPresenter {
  constructor(private router: Router) {}

  navigateToRepository(repositoryId: number): void {
    this.router.navigate(['repositories', repositoryId]);
  }
}
