import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersStatisticsComponent } from './containers/users-statistics/users-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: UsersStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmpWebReportUsersStatisticsRoutingModule {}
