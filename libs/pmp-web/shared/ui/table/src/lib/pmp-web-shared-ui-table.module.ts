import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatIconModule, MatTableModule } from '@angular/material';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';

@NgModule({
  imports: [CommonModule, MatIconModule, MatTableModule, PmpWebSharedUtilModule],
  declarations: [TableComponent],
  exports: [TableComponent]
})
export class PmpWebSharedUiTableModule {}
