import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellRoutingModule } from './shell-routing.module';
import { AuthComponent } from './containers/auth/auth.component';

@NgModule({
  imports: [CommonModule, ShellRoutingModule],
  exports: [ShellRoutingModule],
  declarations: [AuthComponent]
})
export class PmpWebAuthShellModule {}
