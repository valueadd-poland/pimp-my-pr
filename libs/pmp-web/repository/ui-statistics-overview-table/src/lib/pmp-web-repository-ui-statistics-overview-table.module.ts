import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';
import { StatisticsOverviewTableComponent } from './statistics-overview-table/statistics-overview-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    PmpWebSharedUtilModule,
    MatIconModule,
    MatSortModule,
    MatTooltipModule,
    ContentLoaderModule
  ],
  declarations: [StatisticsOverviewTableComponent],
  exports: [StatisticsOverviewTableComponent]
})
export class PmpWebRepositoryUiStatisticsOverviewTableModule {}
