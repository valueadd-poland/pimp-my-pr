import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { GenericDialogComponent } from './components/generic-dialog/generic-dialog.component';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [GenericDialogComponent],
  entryComponents: [GenericDialogComponent]
})
export class PmpWebSharedUiGenericDialogModule {}
