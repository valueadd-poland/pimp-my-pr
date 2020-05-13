import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { PersonsBarComponent } from './persons-bar/persons-bar.component';

@NgModule({
  imports: [CommonModule, PmpWebSharedUiPictureLabelModule, MatTooltipModule],
  exports: [PersonsBarComponent],
  declarations: [PersonsBarComponent]
})
export class PmpWebSharedUiPersonsBarModule {}
