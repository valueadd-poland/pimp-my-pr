import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePrStatisticComponent } from './table-pr-statistic/table-pr-statistic.component';
import { MatIconModule, MatTableModule } from '@angular/material';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { PmpWebSharedUiTimeWaitingLabelModule } from '../../../ui-time-waiting-label/src/lib/pmp-web-shared-ui-time-waiting-label.module';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    PmpWebSharedUiPictureLabelModule,
    PmpWebSharedUiTimeWaitingLabelModule
  ],
  exports: [TablePrStatisticComponent],
  declarations: [TablePrStatisticComponent]
})
export class PmpWebSharedUiTablePrStatisticModule {}
