import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './containers/user/user.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@pimp-my-pr/pmp-web/user/users-statistics/feature').then(
            m => m.PmpWebUserUsersStatisticsFeatureModule
          )
      },
      {
        path: ':userName',
        loadChildren: () =>
          import('@pimp-my-pr/pmp-web/user/single-user-statistics/feature').then(
            m => m.PmpWebUserSingleUserStatisticsFeatureModule
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
