import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { PmpWebSharedUiPersonsBarModule } from '@pimp-my-pr/pmp-web/shared/ui-persons-bar';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { TablePrStatisticComponent } from './table-pr-statistic/table-pr-statistic.component';
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
