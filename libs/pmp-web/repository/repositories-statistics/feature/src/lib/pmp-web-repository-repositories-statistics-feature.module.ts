import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoriesStatisticsComponent } from './containers/repositories-statistics/repositories-statistics.component';
import { PmpWebRepositoryRepositoriesStatisticsRoutingModule } from './pmp-web-repository-repositories-statistics-routing.module';
import { PmpWebSharedUiTableModule } from '@pimp-my-pr/pmp-web/shared/ui-table';
import { PmpWebRepositoryStatisticsDataAccessModule } from '@pimp-my-pr/pmp-web/repository/data-access-repository-statistics';

@NgModule({
  imports: [
    CommonModule,
    PmpWebRepositoryStatisticsDataAccessModule,
    PmpWebRepositoryRepositoriesStatisticsRoutingModule,
    PmpWebSharedUiTableModule
  ],
  declarations: [RepositoriesStatisticsComponent]
})
export class PmpWebRepositoryRepositoriesStatisticsFeatureModule {}
