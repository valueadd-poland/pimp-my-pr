import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { GoBackHeaderComponent } from './components/go-back-header/go-back-header.component';

@NgModule({
  imports: [CommonModule, MatIconModule, RouterModule],
  declarations: [GoBackHeaderComponent],
  exports: [GoBackHeaderComponent]
})
export class PmpWebSharedUiGoBackHeaderModule {}
