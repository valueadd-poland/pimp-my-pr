import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { PmpWebRepositoryReviewerStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/repository/reviewer-statistics/data-access';
import { PmpWebRepositoryUiTablePrStatisticModule } from '@pimp-my-pr/pmp-web/repository/ui-table-pr-statistic';
import { PmpWebSharedUiGoBackHeaderModule } from '@pimp-my-pr/pmp-web/shared/ui-go-back-header';
import { PmpWebSharedUiHeaderContainerModule } from '@pimp-my-pr/pmp-web/shared/ui-header-container';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { ReviewerStatisticsComponent } from './containers/reviewer-statistics/reviewer-statistics.component';
import { PmpWebRepositoryReviewerStatisticsRoutingModule } from './pmp-web-repository-reviewer-statistics-routing.module';
import { PmpWebRepositoryUiTableReviewerStatisticsModule } from '@pimp-my-pr/pmp-web/repository/ui-table-reviewer-statistics';

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
    ContentLoaderModule,
    MatCardModule,
    MatRippleModule,
    PmpWebRepositoryUiTableReviewerStatisticsModule
  ],
  declarations: [ReviewerStatisticsComponent]
})
export class PmpWebRepositoryReviewerStatisticsFeatureModule {}
