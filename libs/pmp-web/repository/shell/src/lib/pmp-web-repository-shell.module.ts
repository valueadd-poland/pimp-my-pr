import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmpWebSharedUiNavbarModule } from '@pimp-my-pr/pmp-web/shared/ui-navbar';
import { PmpWebSharedUiSidebarModule } from '@pimp-my-pr/pmp-web/shared/ui-sidebar';

import { RepositoriesComponent } from './containers/repositories/repositories.component';
import { ShellRoutingModule } from './shell-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ShellRoutingModule,
    PmpWebSharedUiNavbarModule,
    PmpWebSharedUiSidebarModule
  ],
  exports: [ShellRoutingModule],
  declarations: [RepositoriesComponent]
})
export class PmpWebRepositoryShellModule {}
