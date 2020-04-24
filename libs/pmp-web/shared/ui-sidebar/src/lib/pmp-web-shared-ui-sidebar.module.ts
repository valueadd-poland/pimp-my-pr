import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatSidenavModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [MatTooltipModule, CommonModule, MatIconModule, RouterModule, MatSidenavModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})
export class PmpWebSharedUiSidebarModule {}
