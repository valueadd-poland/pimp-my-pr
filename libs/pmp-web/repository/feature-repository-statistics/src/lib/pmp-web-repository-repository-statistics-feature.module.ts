import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryStatisticsComponent } from './repository-statistics/repository-statistics.component';
import { PmpWebSharedUiTableStatisticModule } from '@pimp-my-pr/pmp-web/shared/ui-table-statistic';
import { PmpWebSharedUiHeaderContainerModule } from '@pimp-my-pr/pmp-web/shared/ui-header-container';
import { PmpWebRepositoryRepositoryStatisticsRoutingModule } from './pmp-web-repository-repository-statistics-routing.module';
import { PmpWebRepositoryDataAccessSingleRepositoryStatisticsModule } from '@pimp-my-pr/pmp-web/repository/data-access-single-repository-statistics';

@NgModule({
  imports: [
    CommonModule,
    PmpWebSharedUiHeaderContainerModule,
    PmpWebSharedUiTableStatisticModule,
    PmpWebRepositoryRepositoryStatisticsRoutingModule,
    PmpWebRepositoryDataAccessSingleRepositoryStatisticsModule
  ],
  declarations: [RepositoryStatisticsComponent]
})
export class PmpWebRepositoryRepositoryStatisticsFeatureModule {}
