import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmpWebReportSingleUserStatisticsRoutingModule } from './pmp-web-report-single-user-statistics-routing.module';
import { SingleUserStatisticsComponent } from './containers/single-user-statistics/single-user-statistics.component';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { MatIconModule, MatTableModule } from '@angular/material';
import { PmpWebRepositoryReviewerStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/repository/reviewer-statistics/data-access';
import { PmpWebSharedUiGoBackHeaderModule } from '@pimp-my-pr/pmp-web/shared/ui-go-back-header';
import { PmpWebRepositoryUiTablePrStatisticModule } from '@pimp-my-pr/pmp-web/repository/ui-table-pr-statistic';
import { PmpWebSharedUiHeaderContainerModule } from '@pimp-my-pr/pmp-web/shared/ui-header-container';
import { ContentLoaderModule } from '@ngneat/content-loader';

@NgModule({
  imports: [
    CommonModule,
    PmpWebReportSingleUserStatisticsRoutingModule,
    PmpWebSharedUiPictureLabelModule,
    PmpWebRepositoryReviewerStatisticsDataAccessModule,
    PmpWebRepositoryUiTablePrStatisticModule,
    PmpWebSharedUiHeaderContainerModule,
    MatTableModule,
    MatIconModule,
    PmpWebSharedUiGoBackHeaderModule,
    ContentLoaderModule
  ],
  declarations: [SingleUserStatisticsComponent]
})
export class PmpWebRepositoryReviewerStatisticsFeatureModule {}
