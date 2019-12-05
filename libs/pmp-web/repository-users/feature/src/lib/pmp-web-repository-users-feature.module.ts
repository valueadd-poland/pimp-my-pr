import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmpWebRepositoryUsersFeatureComponent } from './pmp-web-repository-users-feature.component';
import { PmpWebSharedUiTableModule } from '@pimp-my-pr/pmp-web/shared/ui-table';
import { PmpWebSharedUiNavbarModule } from '@pimp-my-pr/pmp-web/shared/ui-navbar';
import { PmpWebSharedUiSidebarModule } from '@pimp-my-pr/pmp-web/shared/ui-sidebar';

@NgModule({
  imports: [
    CommonModule,
    PmpWebSharedUiTableModule,
    PmpWebSharedUiNavbarModule,
    PmpWebSharedUiSidebarModule
  ],
  exports: [PmpWebRepositoryUsersFeatureComponent],
  declarations: [PmpWebRepositoryUsersFeatureComponent]
})
export class PmpWebRepositoryUsersFeatureModule {}
