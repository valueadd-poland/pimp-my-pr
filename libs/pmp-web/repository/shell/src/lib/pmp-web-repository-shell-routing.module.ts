import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPublicGuard } from '@pimp-my-pr/pmp-web/auth/public';
import { RepositoriesComponent } from './containers/repositories/repositories.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthPublicGuard],
    children: [
      {
        path: 'user',
        component: RepositoriesComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@pimp-my-pr/pmp-web/repository/reviewers-statistics/feature').then(
                m => m.PmpWebRepositoryReviewersStatisticsFeatureModule
              )
          },
          {
            path: ':userName',
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
    ]
  },
  {
    path: 'repository-settings',
    component: RepositoriesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@pimp-my-pr/pmp-web/repository/repository-settings/feature').then(
            m => m.PmpWebRepositoryRepositorySettingsFeatureModule
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
