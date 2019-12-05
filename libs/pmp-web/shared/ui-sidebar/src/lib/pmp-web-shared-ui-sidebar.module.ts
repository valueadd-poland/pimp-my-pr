import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatIconModule],
  exports: [SidebarComponent],
  declarations: [SidebarComponent]
})
export class PmpWebSharedUiSidebarModule {}
