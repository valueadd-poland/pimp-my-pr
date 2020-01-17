import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoriesComponent } from './containers/repositories/repositories.component';

const routes: Routes = [
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule {}
