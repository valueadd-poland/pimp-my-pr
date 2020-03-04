import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './containers/user/user.component';
import { RepositoriesComponent } from './containers/repositories/repositories.component';

const routes: Routes = [
  {
    path: 'reviewer',
    component: UserComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@pimp-my-pr/pmp-web/repository/reviewers-statistics/feature').then(
            m => m.PmpWebRepositoryReviewersStatisticsFeatureModule
          )
      },
      {
        path: ':reviewerName',
        loadChildren: () =>
          import('@pimp-my-pr/pmp-web/repository/reviewer-statistics/feature').then(
            m => m.PmpWebRepositoryReviewerStatisticsFeatureModule
          )
      }
    ]
  },
  {
    path: 'repositories',
    component: RepositoriesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@pimp-my-pr/pmp-web/repository/repositories-statistics/feature').then(
            m => m.PmpWebRepositoryRepositoriesStatisticsFeatureModule
          )
      },
      {
        path: ':repositoryId',
        loadChildren: () =>
          import('@pimp-my-pr/pmp-web/repository/repository-statistics/feature').then(
            m => m.PmpWebRepositoryRepositoryStatisticsFeatureModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmpWebRepositoryShellRoutingModule {}
