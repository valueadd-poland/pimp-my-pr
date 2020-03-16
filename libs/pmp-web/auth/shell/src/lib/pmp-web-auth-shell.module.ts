import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthComponent } from './containers/auth/auth.component';
import { ShellRoutingModule } from './shell-routing.module';

@NgModule({
  imports: [CommonModule, ShellRoutingModule],
  exports: [ShellRoutingModule],
  declarations: [AuthComponent]
})
export class PmpWebAuthShellModule {}
