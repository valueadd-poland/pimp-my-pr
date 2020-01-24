import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStatisticsComponent } from './containers/users-statistics/users-statistics.component';
import { PmpWebUserUsersStatisticsRoutingModule } from './pmp-web-user-users-statistics-routing.module';
import { PmpWebUserDataAccessModule } from '@pimp-my-pr/pmp-web/user/data-access';
import { PmpWebSharedUiStatisticsOverviewTableModule } from '@pimp-my-pr/pmp-web/shared/ui-statistics-overview-table';

@NgModule({
  imports: [
    CommonModule,
    PmpWebUserUsersStatisticsRoutingModule,
    PmpWebUserDataAccessModule,
    PmpWebSharedUiStatisticsOverviewTableModule
  ],
  declarations: [UsersStatisticsComponent]
})
export class PmpWebUserUsersStatisticsFeatureModule {}
