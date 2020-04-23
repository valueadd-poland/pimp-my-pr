import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositorySettingsComponent } from './containers/repository-settings/repository-settings.component';
import { PmpWebRepositoryRepositorySettingsFeatureRouting } from './pmp-web-repository-repository-settings-feature.routing';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { PmpWebRepositoryDataAccessModule } from '@pimp-my-pr/pmp-web/repository/data-access';
import { PmpWebRepositoryRepositorySettingsUiModule } from '@pimp-my-pr/pmp-web/repository/repository-settings/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRepositoryDialogComponent } from './containers/add-repository-dialog/add-repository-dialog.component';
import { ValidationMessagesModule } from '@valueadd/validation-messages';

@NgModule({
  imports: [
    CommonModule,
    PmpWebRepositoryRepositorySettingsFeatureRouting,
    PmpWebSharedUtilModule,
    ContentLoaderModule,
    PmpWebRepositoryDataAccessModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    PmpWebRepositoryRepositorySettingsUiModule,
    ValidationMessagesModule
  ],
  declarations: [RepositorySettingsComponent, AddRepositoryDialogComponent],
  entryComponents: [AddRepositoryDialogComponent]
})
export class PmpWebRepositoryRepositorySettingsFeatureModule {}
