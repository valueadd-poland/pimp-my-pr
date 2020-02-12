import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryStatisticsComponent } from './repository-statistics/repository-statistics.component';
import { PmpWebSharedReportUiTablePrStatisticModule } from '@pimp-my-pr/pmp-web/shared/report/ui-table-pr-statistic';
import { PmpWebSharedUiHeaderContainerModule } from '@pimp-my-pr/pmp-web/shared/ui-header-container';
import { PmpWebReportRepositoryStatisticsRoutingModule } from './pmp-web-report-repository-statistics-routing.module';
import { PmpWebReportRepositoryStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/report/repository-statistics/data-access';
import { PmpWebSharedUiGoBackHeaderModule } from '@pimp-my-pr/pmp-web/shared/ui-go-back-header';
import { ContentLoaderModule } from '@ngneat/content-loader';

@NgModule({
  imports: [
    CommonModule,
    PmpWebSharedUiHeaderContainerModule,
    PmpWebSharedReportUiTablePrStatisticModule,
    PmpWebReportRepositoryStatisticsRoutingModule,
    PmpWebReportRepositoryStatisticsDataAccessModule,
    PmpWebSharedUiGoBackHeaderModule,
    ContentLoaderModule
  ],
  declarations: [RepositoryStatisticsComponent]
})
export class PmpWebReportRepositoryStatisticsFeatureModule {}
