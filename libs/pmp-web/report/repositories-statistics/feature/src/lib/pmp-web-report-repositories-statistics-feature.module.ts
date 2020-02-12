import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoriesStatisticsComponent } from './containers/repositories-statistics/repositories-statistics.component';
import { PmpWebReportRepositoriesStatisticsRoutingModule } from './pmp-web-report-repositories-statistics-routing.module';
import { PmpWebSharedReportUiStatisticsOverviewTableModule } from '@pimp-my-pr/pmp-web/shared/report/ui-statistics-overview-table';
import { PmpWebRepositoriesStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/report/repositories-statistics/data-access';

@NgModule({
  imports: [
    CommonModule,
    PmpWebRepositoriesStatisticsDataAccessModule,
    PmpWebReportRepositoriesStatisticsRoutingModule,
    PmpWebSharedReportUiStatisticsOverviewTableModule
  ],
  declarations: [RepositoriesStatisticsComponent]
})
export class PmpWebReportRepositoriesStatisticsFeatureModule {}
