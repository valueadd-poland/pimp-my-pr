import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SETTINGS_FEATURE_KEY, SettingsState } from './settings.reducer';

// Lookup the 'Settings' feature state managed by NgRx
const getSettingsState = createFeatureSelector<SettingsState>(SETTINGS_FEATURE_KEY);

const getSettingModelCollection = createSelector(
  getSettingsState,
  state => state.settingModelCollection
);

const getSettingModelCollectionLoading = createSelector(
  getSettingsState,
  state => state.settingModelCollectionLoading
);

const getSettingModelCollectionLoadError = createSelector(
  getSettingsState,
  state => state.settingModelCollectionLoadError
);

const getSettingModelUpdating = createSelector(
  getSettingsState,
  state => state.settingModelUpdating
);

const getSettingModelUpdateError = createSelector(
  getSettingsState,
  state => state.settingModelUpdateError
);

export const settingsQuery = {
  getSettingModelCollection,
  getSettingModelCollectionLoading,
  getSettingModelCollectionLoadError,
  getSettingModelUpdating,
  getSettingModelUpdateError
};
