import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellRoutingModule } from './shell-routing.module';
import { UserComponent } from './containers/user/user.component';
import { PmpWebSharedUiNavbarModule } from '@pimp-my-pr/pmp-web/shared/ui-navbar';
import { PmpWebSharedUiSidebarModule } from '@pimp-my-pr/pmp-web/shared/ui-sidebar';

@NgModule({
  imports: [
    CommonModule,
    ShellRoutingModule,
    PmpWebSharedUiNavbarModule,
    PmpWebSharedUiSidebarModule
  ],
  exports: [ShellRoutingModule],
  declarations: [UserComponent]
})
export class PmpWebUserShellModule {}
