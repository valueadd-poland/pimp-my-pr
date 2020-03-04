import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePrStatisticComponent } from './table-pr-statistic/table-pr-statistic.component';
import { MatIconModule, MatSortModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { PmpWebSharedUiPersonsBarModule } from '@pimp-my-pr/pmp-web/shared/ui-persons-bar';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    PmpWebSharedUiPictureLabelModule,
    ContentLoaderModule,
    MatSortModule,
    PmpWebSharedUiPersonsBarModule,
    PmpWebSharedUtilModule
  ],
  exports: [TablePrStatisticComponent],
  declarations: [TablePrStatisticComponent]
})
export class PmpWebRepositoryUiTablePrStatisticModule {}
