import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { RepositorySettingsComponent } from './containers/repository-settings/repository-settings.component';
import { PmpWebRepositoryRepositorySettingsFeatureRouting } from './pmp-web-repository-repository-settings-feature.routing';

@NgModule({
  imports: [CommonModule, PmpWebRepositoryRepositorySettingsFeatureRouting, MatTabsModule],
  declarations: [RepositorySettingsComponent]
})
export class PmpWebRepositoryRepositorySettingsFeatureModule {}
