import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PmpWebSharedUiPictureLabelModule } from '@pimp-my-pr/pmp-web/shared/ui-picture-label';
import { HeaderContainerComponent } from './header-container/header-container.component';

@NgModule({
  imports: [CommonModule, PmpWebSharedUiPictureLabelModule],
  exports: [HeaderContainerComponent],
  declarations: [HeaderContainerComponent]
})
export class PmpWebSharedUiHeaderContainerModule {}
