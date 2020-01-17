import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatIconModule, MatSidenavModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MatIconModule, RouterModule, MatSidenavModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})
export class PmpWebSharedUiSidebarModule {}
