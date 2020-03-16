import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PmpWebRepositoryReviewersStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/repository/reviewers-statistics/data-access';
import { PmpWebRepositoryUiStatisticsOverviewTableModule } from '@pimp-my-pr/pmp-web/repository/ui-statistics-overview-table';
import { ReviewersStatisticsComponent } from './containers/reviewers-statistics/reviewers-statistics.component';
import { PmpWebRepositoryReviewersStatisticsRoutingModule } from './pmp-web-repository-reviewers-statistics-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PmpWebRepositoryReviewersStatisticsRoutingModule,
    PmpWebRepositoryReviewersStatisticsDataAccessModule,
    PmpWebRepositoryUiStatisticsOverviewTableModule
  ],
  declarations: [ReviewersStatisticsComponent]
})
export class PmpWebRepositoryReviewersStatisticsFeatureModule {}
