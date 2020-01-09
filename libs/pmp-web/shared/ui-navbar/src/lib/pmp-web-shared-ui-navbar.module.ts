import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class PmpWebSharedUiNavbarModule {}
