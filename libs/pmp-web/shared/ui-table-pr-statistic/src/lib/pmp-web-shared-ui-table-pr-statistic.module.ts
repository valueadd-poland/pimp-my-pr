import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePrStatisticComponent } from './table-pr-statistic/table-pr-statistic.component';
import { MatIconModule, MatSortModule, MatTableModule } from '@angular/material';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { PmpWebSharedUiPersonsBarModule } from '@pimp-my-pr/pmp-web/shared/ui-persons-bar';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    PmpWebSharedUiPictureLabelModule,
    MatSortModule,
    PmpWebSharedUiPersonsBarModule
  ],
  exports: [TablePrStatisticComponent],
  declarations: [TablePrStatisticComponent]
})
export class PmpWebSharedUiTablePrStatisticModule {}
