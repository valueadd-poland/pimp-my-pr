import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewersStatisticsComponent } from './containers/reviewers-statistics/reviewers-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewersStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmpWebRepositoryReviewersStatisticsRoutingModule {}
