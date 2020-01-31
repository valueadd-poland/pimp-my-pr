import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePrStatisticComponent } from './table-pr-statistic/table-pr-statistic.component';
import { MatIconModule, MatSortModule, MatTableModule } from '@angular/material';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    PmpWebSharedUiPictureLabelModule,
    MatSortModule
  ],
  exports: [TablePrStatisticComponent],
  declarations: [TablePrStatisticComponent]
})
export class PmpWebSharedUiTablePrStatisticModule {}
