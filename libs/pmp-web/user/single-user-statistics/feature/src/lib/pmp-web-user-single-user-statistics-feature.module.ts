import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmpWebUserSingleUserStatisticsRoutingModule } from './pmp-web-user-single-user-statistics-routing.module';
import { SingleUserStatisticsComponent } from './containers/single-user-statistics/single-user-statistics.component';

@NgModule({
  imports: [CommonModule, PmpWebUserSingleUserStatisticsRoutingModule],
  declarations: [SingleUserStatisticsComponent]
})
export class PmpWebUserSingleUserStatisticsFeatureModule {}
