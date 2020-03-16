import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PictureLabelComponent } from './components/picture-label/picture-label.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PictureLabelComponent],
  exports: [PictureLabelComponent]
})
export class PmpWebSharedUiPictureLabelModule {}
