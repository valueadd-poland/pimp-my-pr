import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeWaitingLabelComponent } from './time-waiting-label/time-waiting-label.component';
import { MatTooltipModule } from '@angular/material';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [CommonModule, MatTooltipModule, PmpWebSharedUtilModule, OverlayModule],
  declarations: [TimeWaitingLabelComponent],
  exports: [TimeWaitingLabelComponent]
})
export class PmpWebSharedUiTimeWaitingLabelModule {}
