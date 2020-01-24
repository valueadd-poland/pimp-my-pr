import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmpWebUserSingleUserStatisticsRoutingModule } from './pmp-web-user-single-user-statistics-routing.module';
import { SingleUserStatisticsComponent } from './containers/single-user-statistics/single-user-statistics.component';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { SingleUserStatisticsTableComponent } from './components/single-user-statistics-table/single-user-statistics-table.component';
import { MatIconModule, MatTableModule } from '@angular/material';
import { PmpWebUserSingleUserStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/user/single-user-statistics/data-access';
import { PmpWebSharedUiGoBackHeaderModule } from '@pimp-my-pr/pmp-web/shared/ui-go-back-header';

@NgModule({
  imports: [
    CommonModule,
    PmpWebUserSingleUserStatisticsRoutingModule,
    PmpWebSharedUiPictureLabelModule,
    PmpWebUserSingleUserStatisticsDataAccessModule,
    MatTableModule,
    MatIconModule,
    PmpWebSharedUiGoBackHeaderModule
  ],
  declarations: [SingleUserStatisticsComponent, SingleUserStatisticsTableComponent]
})
export class PmpWebUserSingleUserStatisticsFeatureModule {}
