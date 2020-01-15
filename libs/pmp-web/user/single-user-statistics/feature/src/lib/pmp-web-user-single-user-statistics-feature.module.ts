import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmpWebUserSingleUserStatisticsRoutingModule } from './pmp-web-user-single-user-statistics-routing.module';
import { SingleUserStatisticsComponent } from './containers/single-user-statistics/single-user-statistics.component';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { PmpWebSharedUiTableModule } from '@pimp-my-pr/pmp-web/shared/ui-table';

@NgModule({
  imports: [
    CommonModule,
    PmpWebUserSingleUserStatisticsRoutingModule,
    PmpWebSharedUiPictureLabelModule,
    PmpWebSharedUiTableModule
  ],
  declarations: [SingleUserStatisticsComponent]
})
export class PmpWebUserSingleUserStatisticsFeatureModule {}
