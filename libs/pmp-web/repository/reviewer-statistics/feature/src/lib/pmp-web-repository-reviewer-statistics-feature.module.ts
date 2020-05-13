import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { PmpWebRepositoryReviewerStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/repository/reviewer-statistics/data-access';
import { PmpWebRepositoryUiTablePrStatisticModule } from '@pimp-my-pr/pmp-web/repository/ui-table-pr-statistic';
import { PmpWebSharedUiGoBackHeaderModule } from '@pimp-my-pr/pmp-web/shared/ui-go-back-header';
import { PmpWebSharedUiHeaderContainerModule } from '@pimp-my-pr/pmp-web/shared/ui-header-container';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { ReviewerStatisticsComponent } from './containers/reviewer-statistics/reviewer-statistics.component';
import { PmpWebRepositoryReviewerStatisticsRoutingModule } from './pmp-web-repository-reviewer-statistics-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PmpWebRepositoryReviewerStatisticsRoutingModule,
    PmpWebSharedUiPictureLabelModule,
    PmpWebRepositoryReviewerStatisticsDataAccessModule,
    PmpWebRepositoryUiTablePrStatisticModule,
    PmpWebSharedUiHeaderContainerModule,
    MatTableModule,
    MatIconModule,
    PmpWebSharedUiGoBackHeaderModule,
    ContentLoaderModule
  ],
  declarations: [ReviewerStatisticsComponent]
})
export class PmpWebRepositoryReviewerStatisticsFeatureModule {}
