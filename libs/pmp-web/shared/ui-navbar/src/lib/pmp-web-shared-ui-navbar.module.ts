import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class PmpWebSharedUiNavbarModule {}
