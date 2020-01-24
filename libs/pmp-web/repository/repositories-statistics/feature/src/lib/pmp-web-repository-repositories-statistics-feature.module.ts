import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoriesStatisticsComponent } from './containers/repositories-statistics/repositories-statistics.component';
import { PmpWebRepositoryRepositoriesStatisticsRoutingModule } from './pmp-web-repository-repositories-statistics-routing.module';
import { PmpWebRepositoryStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/repository/data-access-repository-statistics';
import { PmpWebSharedUiStatisticsOverviewTableModule } from '@pimp-my-pr/pmp-web/shared/ui-statistics-overview-table';

@NgModule({
  imports: [
    CommonModule,
    PmpWebRepositoryStatisticsDataAccessModule,
    PmpWebRepositoryRepositoriesStatisticsRoutingModule,
    PmpWebSharedUiStatisticsOverviewTableModule
  ],
  declarations: [RepositoriesStatisticsComponent]
})
export class PmpWebRepositoryRepositoriesStatisticsFeatureModule {}
