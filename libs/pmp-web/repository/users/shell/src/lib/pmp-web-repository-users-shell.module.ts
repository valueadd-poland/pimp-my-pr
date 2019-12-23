import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellRoutingModule } from './shell-routing.module';

@NgModule({
  imports: [CommonModule, ShellRoutingModule],
  exports: [ShellRoutingModule]
})
export class PmpWebRepositoryUsersShellModule {}
