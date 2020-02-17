import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingleUserStatisticsComponent } from './containers/single-user-statistics/single-user-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: SingleUserStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmpWebRepositoryReviewerStatisticsRoutingModule {}
