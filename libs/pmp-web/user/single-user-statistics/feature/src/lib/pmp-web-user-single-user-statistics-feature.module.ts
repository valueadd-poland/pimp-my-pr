import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmpWebUserSingleUserStatisticsRoutingModule } from './pmp-web-user-single-user-statistics-routing.module';
import { SingleUserStatisticsComponent } from './containers/single-user-statistics/single-user-statistics.component';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { SingleUserStatisticsTableComponent } from './components/single-user-statistics-table/single-user-statistics-table.component';
import { MatIconModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PmpWebUserSingleUserStatisticsRoutingModule,
    PmpWebSharedUiPictureLabelModule,
    MatTableModule,
    MatIconModule
  ],
  declarations: [SingleUserStatisticsComponent, SingleUserStatisticsTableComponent]
})
export class PmpWebUserSingleUserStatisticsFeatureModule {}
