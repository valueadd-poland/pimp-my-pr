import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStatisticsComponent } from './containers/users-statistics/users-statistics.component';
import { PmpWebUserUsersStatisticsRoutingModule } from './pmp-web-user-users-statistics-routing.module';
import { PmpWebReportUsersStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/report/users-statistics/data-access';
import { PmpWebSharedUiStatisticsOverviewTableModule } from '@pimp-my-pr/pmp-web/shared/ui-statistics-overview-table';

@NgModule({
  imports: [
    CommonModule,
    PmpWebUserUsersStatisticsRoutingModule,
    PmpWebReportUsersStatisticsDataAccessModule,
    PmpWebSharedUiStatisticsOverviewTableModule
  ],
  declarations: [UsersStatisticsComponent]
})
export class PmpWebReportUsersStatisticsFeatureModule {}
