import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsBarComponent } from './persons-bar/persons-bar.component';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, PmpWebSharedUiPictureLabelModule, MatTooltipModule],
  exports: [PersonsBarComponent],
  declarations: [PersonsBarComponent]
})
export class PmpWebSharedUiPersonsBarModule {}
