import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { PmpWebRepositoryRepositoryStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/repository/repository-statistics/data-access';
import { PmpWebRepositoryUiTablePrStatisticModule } from '@pimp-my-pr/pmp-web/repository/ui-table-pr-statistic';
import { PmpWebSharedUiGoBackHeaderModule } from '@pimp-my-pr/pmp-web/shared/ui-go-back-header';
import { PmpWebSharedUiHeaderContainerModule } from '@pimp-my-pr/pmp-web/shared/ui-header-container';
import { PmpWebRepositoryStatisticsRoutingModule } from './pmp-web-repository-statistics-routing.module';
import { RepositoryStatisticsComponent } from './repository-statistics/repository-statistics.component';

@NgModule({
  imports: [
    CommonModule,
    PmpWebSharedUiHeaderContainerModule,
    PmpWebRepositoryUiTablePrStatisticModule,
    PmpWebRepositoryStatisticsRoutingModule,
    PmpWebRepositoryRepositoryStatisticsDataAccessModule,
    PmpWebSharedUiGoBackHeaderModule,
    ContentLoaderModule
  ],
  declarations: [RepositoryStatisticsComponent]
})
export class PmpWebRepositoryRepositoryStatisticsFeatureModule {}
