import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReviewerStatisticsComponent } from './containers/reviewer-statistics/reviewer-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewerStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmpWebRepositoryReviewerStatisticsRoutingModule {}
