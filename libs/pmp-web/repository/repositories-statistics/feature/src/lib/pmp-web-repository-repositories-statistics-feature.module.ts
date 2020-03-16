import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PmpWebRepositoriesStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/repository/repositories-statistics/data-access';
import { PmpWebRepositoryUiStatisticsOverviewTableModule } from '@pimp-my-pr/pmp-web/repository/ui-statistics-overview-table';
import { RepositoriesStatisticsComponent } from './containers/repositories-statistics/repositories-statistics.component';
import { PmpWebRepositoryRepositoriesStatisticsRoutingModule } from './pmp-web-repository-repositories-statistics-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PmpWebRepositoriesStatisticsDataAccessModule,
    PmpWebRepositoryRepositoriesStatisticsRoutingModule,
    PmpWebRepositoryUiStatisticsOverviewTableModule
  ],
  declarations: [RepositoriesStatisticsComponent]
})
export class PmpWebRepositoryRepositoriesStatisticsFeatureModule {}
