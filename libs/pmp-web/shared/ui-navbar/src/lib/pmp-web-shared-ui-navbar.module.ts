import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatIconModule],
  exports: [NavbarComponent],
  declarations: [NavbarComponent]
})
export class PmpWebSharedUiNavbarModule {}
