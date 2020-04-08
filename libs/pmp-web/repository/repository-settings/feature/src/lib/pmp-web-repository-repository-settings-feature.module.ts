import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositorySettingsComponent } from './containers/repository-settings/repository-settings.component';
import { PmpWebRepositoryRepositorySettingsFeatureRouting } from './pmp-web-repository-repository-settings-feature.routing';
import { MatTabsModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, PmpWebRepositoryRepositorySettingsFeatureRouting, MatTabsModule],
  declarations: [RepositorySettingsComponent]
})
export class PmpWebRepositoryRepositorySettingsFeatureModule {}
