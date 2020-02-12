import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './containers/user/user.component';
import { RepositoriesComponent } from './containers/repositories/repositories.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@pimp-my-pr/pmp-web/report/users-statistics/feature').then(
            m => m.PmpWebReportUsersStatisticsFeatureModule
          )
      },
      {
        path: ':userName',
        loadChildren: () =>
          import('@pimp-my-pr/pmp-web/report/single-user-statistics/feature').then(
            m => m.PmpWebReportSingleUserStatisticsFeatureModule
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
          import('@pimp-my-pr/pmp-web/report/repositories-statistics/feature').then(
            m => m.PmpWebReportRepositoriesStatisticsFeatureModule
          )
      },
      {
        path: ':repositoryId',
        loadChildren: () =>
          import('@pimp-my-pr/pmp-web/report/repository-statistics/feature').then(
            m => m.PmpWebReportRepositoryStatisticsFeatureModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmpWebReportShellRoutingModule {}
