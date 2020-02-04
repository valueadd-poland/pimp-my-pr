import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsOverviewTableComponent } from './statistics-overview-table/statistics-overview-table.component';
import { MatIconModule, MatSortModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';
import { ContentLoaderModule } from '@ngneat/content-loader';

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
export class PmpWebSharedUiStatisticsOverviewTableModule {}
