import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorBoxComponent } from './error-box/error-box.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [CommonModule, MatDividerModule],
  declarations: [ErrorBoxComponent],
  exports: [ErrorBoxComponent]
})
export class PmpWebSharedUiErrorBoxModule {}
