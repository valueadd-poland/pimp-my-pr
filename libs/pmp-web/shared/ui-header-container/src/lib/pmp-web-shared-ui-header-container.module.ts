import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContainerComponent } from './header-container/header-container.component';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';

@NgModule({
  imports: [CommonModule, PmpWebSharedUiPictureLabelModule],
  exports: [HeaderContainerComponent],
  declarations: [HeaderContainerComponent]
})
export class PmpWebSharedUiHeaderContainerModule {}
