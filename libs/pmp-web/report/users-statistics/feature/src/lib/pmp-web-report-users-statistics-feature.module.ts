import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStatisticsComponent } from './containers/users-statistics/users-statistics.component';
import { PmpWebReportUsersStatisticsRoutingModule } from './pmp-web-report-users-statistics-routing.module';
import { PmpWebReportUsersStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/report/users-statistics/data-access';
import { PmpWebSharedReportUiStatisticsOverviewTableModule } from '@pimp-my-pr/pmp-web/shared/report/ui-statistics-overview-table';

@NgModule({
  imports: [
    CommonModule,
    PmpWebReportUsersStatisticsRoutingModule,
    PmpWebReportUsersStatisticsDataAccessModule,
    PmpWebSharedReportUiStatisticsOverviewTableModule
  ],
  declarations: [UsersStatisticsComponent]
})
export class PmpWebReportUsersStatisticsFeatureModule {}
