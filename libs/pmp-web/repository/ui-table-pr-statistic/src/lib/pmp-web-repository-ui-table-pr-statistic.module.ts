import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatSortModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { PmpWebSharedUiPersonsBarModule } from '@pimp-my-pr/pmp-web/shared/ui-persons-bar';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { TablePrStatisticComponent } from './table-pr-statistic/table-pr-statistic.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    PmpWebSharedUiPictureLabelModule,
    ContentLoaderModule,
    MatSortModule,
    PmpWebSharedUiPersonsBarModule
  ],
  exports: [TablePrStatisticComponent],
  declarations: [TablePrStatisticComponent]
})
export class PmpWebRepositoryUiTablePrStatisticModule {}
