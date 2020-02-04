import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryStatistics } from '@pimp-my-pr/shared/domain';

@Injectable()
export class RepositoriesStatisticsPresenter {
  constructor(private router: Router) {}

  navigateToRepository(repository: RepositoryStatistics): void {
    this.router.navigate(['repositories', repository.id], {
      state: { name: repository.name, pictureUrl: repository.pictureUrl }
    });
  }
}
