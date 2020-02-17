import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepositoryStatisticsComponent } from './repository-statistics/repository-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: RepositoryStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmpWebReportRepositoryStatisticsRoutingModule {}
