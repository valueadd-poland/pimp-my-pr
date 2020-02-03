import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsOverviewTableComponent } from './statistics-overview-table/statistics-overview-table.component';
import { MatIconModule, MatSortModule, MatTableModule } from '@angular/material';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';
import { PmpWebSharedUiTimeWaitingLabelModule } from '../../../ui-time-waiting-label/src/lib/pmp-web-shared-ui-time-waiting-label.module';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    PmpWebSharedUtilModule,
    MatIconModule,
    MatSortModule,
    PmpWebSharedUiTimeWaitingLabelModule
  ],
  declarations: [StatisticsOverviewTableComponent],
  exports: [StatisticsOverviewTableComponent]
})
export class PmpWebSharedUiStatisticsOverviewTableModule {}
