import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  SETTINGS_FEATURE_KEY,
  initialState as settingsInitialState,
  settingsReducer
} from './+state/settings.reducer';
import { SettingsEffects } from './+state/settings.effects';
import { SettingsFacade } from './+state/settings.facade';
import { SettingsDataService } from './services/settings-data.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(SETTINGS_FEATURE_KEY, settingsReducer, {
      initialState: settingsInitialState
    }),
    EffectsModule.forFeature([SettingsEffects])
  ],
  providers: [SettingsFacade, SettingsDataService]
})
export class PmpWebRepositoryRepositorySettingsDataAccessModule {}
