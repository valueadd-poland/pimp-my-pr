import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryStatisticsComponent } from './repository-statistics/repository-statistics.component';
import { PmpWebSharedUiTablePrStatisticModule } from '@pimp-my-pr/pmp-web/shared/ui-table-pr-statistic';
import { PmpWebSharedUiHeaderContainerModule } from '@pimp-my-pr/pmp-web/shared/ui-header-container';
import { PmpWebRepositoryRepositoryStatisticsRoutingModule } from './pmp-web-repository-repository-statistics-routing.module';
import { PmpWebRepositoryRepositoryStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/repository/repository-statistics/data-access';

@NgModule({
  imports: [
    CommonModule,
    PmpWebSharedUiHeaderContainerModule,
    PmpWebSharedUiTablePrStatisticModule,
    PmpWebRepositoryRepositoryStatisticsRoutingModule,
    PmpWebRepositoryRepositoryStatisticsDataAccessModule
  ],
  declarations: [RepositoryStatisticsComponent]
})
export class PmpWebRepositoryRepositoryStatisticsFeatureModule {}
