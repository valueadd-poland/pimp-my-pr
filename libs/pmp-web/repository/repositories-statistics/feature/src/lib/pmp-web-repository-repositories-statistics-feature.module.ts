import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoriesStatisticsComponent } from './containers/repositories-statistics/repositories-statistics.component';
import { PmpWebReportRepositoriesStatisticsRoutingModule } from './pmp-web-report-repositories-statistics-routing.module';
import { PmpWebRepositoryUiStatisticsOverviewTableModule } from '@pimp-my-pr/pmp-web/repository/ui-statistics-overview-table';
import { PmpWebRepositoriesStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/repository/repositories-statistics/data-access';

@NgModule({
  imports: [
    CommonModule,
    PmpWebRepositoriesStatisticsDataAccessModule,
    PmpWebReportRepositoriesStatisticsRoutingModule,
    PmpWebRepositoryUiStatisticsOverviewTableModule
  ],
  declarations: [RepositoriesStatisticsComponent]
})
export class PmpWebRepositoryRepositoriesStatisticsFeatureModule {}
