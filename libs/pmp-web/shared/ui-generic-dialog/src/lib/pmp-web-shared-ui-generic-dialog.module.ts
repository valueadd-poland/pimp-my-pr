import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericDialogComponent } from './components/generic-dialog/generic-dialog.component';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [GenericDialogComponent],
  entryComponents: [GenericDialogComponent]
})
export class PmpWebSharedUiGenericDialogModule {}
