import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ContentLoaderModule } from '@ngneat/content-loader';

import { PmpWebSharedUiPersonsBarModule } from '@pimp-my-pr/pmp-web/shared/ui-persons-bar';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';
import { TableReviewerStatisticsPresenter } from './table-reviewer-statistic/table-reviewer-statistics.presenter';
import { TableReviewerStatisticComponent } from './table-reviewer-statistic/table-reviewer-statistic.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    ContentLoaderModule,
    MatIconModule,
    PmpWebSharedUiPersonsBarModule,
    PmpWebSharedUiPictureLabelModule,
    MatTooltipModule,
    PmpWebSharedUtilModule
  ],
  declarations: [TableReviewerStatisticComponent],
  providers: [TableReviewerStatisticsPresenter],
  exports: [TableReviewerStatisticComponent]
})
export class PmpWebRepositoryUiTableReviewerStatisticsModule {}
