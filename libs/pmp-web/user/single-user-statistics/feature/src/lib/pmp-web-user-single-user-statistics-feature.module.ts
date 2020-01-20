import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmpWebUserSingleUserStatisticsRoutingModule } from './pmp-web-user-single-user-statistics-routing.module';
import { SingleUserStatisticsComponent } from './containers/single-user-statistics/single-user-statistics.component';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { MatIconModule, MatTableModule } from '@angular/material';
import { PmpWebUserSingleUserStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/user/single-user-statistics/data-access';
import { PmpWebSharedUiTableStatisticModule } from '@pimp-my-pr/pmp-web/shared/ui-table-statistic';
import { PmpWebSharedUiHeaderContainerModule } from '@pimp-my-pr/pmp-web/shared/ui-header-container';

@NgModule({
  imports: [
    CommonModule,
    PmpWebUserSingleUserStatisticsRoutingModule,
    PmpWebSharedUiPictureLabelModule,
    PmpWebUserSingleUserStatisticsDataAccessModule,
    PmpWebSharedUiTableStatisticModule,
    PmpWebSharedUiHeaderContainerModule,
    MatTableModule,
    MatIconModule
  ],
  declarations: [SingleUserStatisticsComponent]
})
export class PmpWebUserSingleUserStatisticsFeatureModule {}
