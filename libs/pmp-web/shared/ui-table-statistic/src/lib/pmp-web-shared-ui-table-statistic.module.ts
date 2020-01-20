import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableStatisticComponent } from './table-statistic/table-statistic.component';
import { MatIconModule, MatTableModule } from '@angular/material';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';

@NgModule({
  imports: [CommonModule, MatTableModule, MatIconModule, PmpWebSharedUiPictureLabelModule],
  exports: [TableStatisticComponent],
  declarations: [TableStatisticComponent]
})
export class PmpWebSharedUiTableStatisticModule {}
