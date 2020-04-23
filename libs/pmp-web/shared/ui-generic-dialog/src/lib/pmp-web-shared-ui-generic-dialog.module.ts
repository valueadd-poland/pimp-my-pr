import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericDialogComponent } from '@pimp-my-pr/pmp-web/shared/ui-generic-dialog';
import { MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [GenericDialogComponent],
  entryComponents: [GenericDialogComponent]
})
export class PmpWebSharedUiGenericDialogModule {}
