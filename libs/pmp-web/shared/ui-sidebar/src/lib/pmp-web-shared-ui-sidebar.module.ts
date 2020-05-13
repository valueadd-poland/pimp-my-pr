import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [MatTooltipModule, CommonModule, MatIconModule, RouterModule, MatSidenavModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})
export class PmpWebSharedUiSidebarModule {}
