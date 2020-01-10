import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStatisticsComponent } from './containers/users-statistics/users-statistics.component';
import { PmpWebSharedUiTableModule } from '@pimp-my-pr/pmp-web/shared/ui-table';
import { PmpWebUserUsersStatisticsRoutingModule } from './pmp-web-user-users-statistics-routing.module';
import { PmpWebUserDataAccessModule } from '@pimp-my-pr/pmp-web/user/data-access';

@NgModule({
  imports: [
    CommonModule,
    PmpWebSharedUiTableModule,
    PmpWebUserUsersStatisticsRoutingModule,
    PmpWebUserDataAccessModule
  ],
  declarations: [UsersStatisticsComponent]
})
export class PmpWebUserUsersStatisticsFeatureModule {}
