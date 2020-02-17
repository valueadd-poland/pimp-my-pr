import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoriesStatisticsComponent } from './containers/repositories-statistics/repositories-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: RepositoriesStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmpWebRepositoryRepositoriesStatisticsRoutingModule {}
