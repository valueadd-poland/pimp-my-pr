import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmpWebSharedUiNavbarModule } from '@pimp-my-pr/pmp-web/shared/ui-navbar';
import { PmpWebSharedUiSidebarModule } from '@pimp-my-pr/pmp-web/shared/ui-sidebar';
import { PmpWebReportShellRoutingModule } from './pmp-web-report-shell-routing.module';
import { UserComponent } from './containers/user/user.component';
import { RepositoriesComponent } from './containers/repositories/repositories.component';

@NgModule({
  imports: [
    CommonModule,
    PmpWebReportShellRoutingModule,
    PmpWebSharedUiNavbarModule,
    PmpWebSharedUiSidebarModule
  ],
  exports: [PmpWebReportShellRoutingModule],
  declarations: [UserComponent, RepositoriesComponent]
})
export class PmpWebReportShellModule {}
