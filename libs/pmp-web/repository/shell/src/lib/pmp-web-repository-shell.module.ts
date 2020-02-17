import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmpWebSharedUiNavbarModule } from '@pimp-my-pr/pmp-web/shared/ui-navbar';
import { PmpWebSharedUiSidebarModule } from '@pimp-my-pr/pmp-web/shared/ui-sidebar';
import { UserComponent } from './containers/user/user.component';
import { RepositoriesComponent } from './containers/repositories/repositories.component';
import { PmpWebRepositoryShellRoutingModule } from './pmp-web-repository-shell-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PmpWebRepositoryShellRoutingModule,
    PmpWebSharedUiNavbarModule,
    PmpWebSharedUiSidebarModule
  ],
  exports: [PmpWebRepositoryShellRoutingModule],
  declarations: [UserComponent, RepositoriesComponent]
})
export class PmpWebRepositoryShellModule {}
