import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PmpWebSharedUtilModule } from '@pimp-my-pr/pmp-web/shared/util';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { RepositoriesSettingsTableComponent } from './repositories-settings-table/repositories-settings-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ValidationMessagesModule } from '@valueadd/validation-messages';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TimeInputComponent } from './time-input/time-input.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    PmpWebSharedUtilModule,
    MatIconModule,
    MatSortModule,
    MatTooltipModule,
    ContentLoaderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ValidationMessagesModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [RepositoriesSettingsTableComponent, TimeInputComponent],
  exports: [RepositoriesSettingsTableComponent, TimeInputComponent]
})
export class PmpWebRepositoryRepositorySettingsUiModule {}
