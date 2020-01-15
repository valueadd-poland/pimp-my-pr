import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { MatTableModule, MatIconModule } from '@angular/material';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    PmpWebSharedUtilModule,
    MatIconModule,
    PmpWebSharedUiPictureLabelModule
  ],
  declarations: [TableComponent],
  exports: [TableComponent]
})
export class PmpWebSharedUiTableModule {}
