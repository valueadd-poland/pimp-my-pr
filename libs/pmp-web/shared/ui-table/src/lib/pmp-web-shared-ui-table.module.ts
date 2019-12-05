import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { MatIconModule, MatTableModule } from '@angular/material';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    PmpWebSharedUtilModule
  ],
  exports: [TableComponent],
  declarations: [TableComponent]
})
export class PmpWebSharedUiTableModule {}
