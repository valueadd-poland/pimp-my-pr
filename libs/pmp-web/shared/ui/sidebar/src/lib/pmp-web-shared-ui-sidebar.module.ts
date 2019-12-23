import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})
export class PmpWebSharedUiSidebarModule {}
