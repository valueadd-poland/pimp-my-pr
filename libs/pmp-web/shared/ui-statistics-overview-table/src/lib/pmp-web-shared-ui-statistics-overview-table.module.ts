import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsOverviewTableComponent } from './statistics-overview-table/statistics-overview-table.component';
import { MatIconModule, MatSortModule, MatTableModule } from '@angular/material';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';

@NgModule({
  imports: [CommonModule, MatTableModule, PmpWebSharedUtilModule, MatIconModule, MatSortModule],
  declarations: [StatisticsOverviewTableComponent],
  exports: [StatisticsOverviewTableComponent]
})
export class PmpWebSharedUiStatisticsOverviewTableModule {}
