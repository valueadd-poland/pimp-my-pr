import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { RepositoriesSettingsTableComponent } from './repositories-settings-table/repositories-settings-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    PmpWebSharedUtilModule,
    MatIconModule,
    MatSortModule,
    MatTooltipModule,
    ContentLoaderModule,
    MatButtonModule
  ],
  declarations: [RepositoriesSettingsTableComponent],
  exports: [RepositoriesSettingsTableComponent]
})
export class PmpWebRepositoryRepositorySettingsUiModule {}
