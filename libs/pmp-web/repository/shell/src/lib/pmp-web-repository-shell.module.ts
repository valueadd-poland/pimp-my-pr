import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellRoutingModule } from './shell-routing.module';
import { RepositoriesComponent } from './containers/repositories/repositories.component';
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
  declarations: [RepositoriesComponent]
})
export class PmpWebRepositoryShellModule {}
