import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewersStatisticsComponent } from './containers/reviewers-statistics/reviewers-statistics.component';
import { PmpWebRepositoryReviewersStatisticsRoutingModule } from './pmp-web-repository-reviewers-statistics-routing.module';
import { PmpWebRepositoryReviewersStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/repository/reviewers-statistics/data-access';
import { PmpWebRepositoryUiStatisticsOverviewTableModule } from '@pimp-my-pr/pmp-web/repository/ui-statistics-overview-table';

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
