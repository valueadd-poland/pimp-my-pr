import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositorySettingsComponent } from './containers/repository-settings/repository-settings.component';
import { PmpWebRepositoryRepositorySettingsFeatureRouting } from './pmp-web-repository-repository-settings-feature.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { PmpWebRepositoryDataAccessModule } from '@pimp-my-pr/pmp-web/repository/data-access';
import { PmpWebRepositoryRepositorySettingsUiModule } from '@pimp-my-pr/pmp-web/repository/repository-settings/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditRepositoryDialogComponent } from './containers/add-edit-repository-dialog/add-edit-repository-dialog.component';
import { ValidationMessagesModule } from '@valueadd/validation-messages';
import { PmpWebSharedUiGenericDialogModule } from '@pimp-my-pr/pmp-web/shared/ui-generic-dialog';
import { SnackbarService } from '@pimp-my-pr/pmp-web/shared/domain';
import { AddEditRepositoryDialogService } from './containers/add-edit-repository-dialog/add-edit-repository-dialog.service';

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
    ValidationMessagesModule,
    PmpWebSharedUiGenericDialogModule
  ],
  declarations: [RepositorySettingsComponent, AddEditRepositoryDialogComponent],
  entryComponents: [AddEditRepositoryDialogComponent],
  providers: [AddEditRepositoryDialogService, SnackbarService]
})
export class PmpWebRepositoryRepositorySettingsFeatureModule {}
