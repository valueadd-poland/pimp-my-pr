import { fromSettingsActions } from './settings.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { SettingModel } from '@pimp-my-pr/pmp-web/repository/domain';

export const SETTINGS_FEATURE_KEY = 'settings';

export interface SettingsState {
  settingModelCollection: SettingModel[];
  settingModelCollectionLoading: boolean;
  settingModelCollectionLoadError: HttpErrorResponse | null;
  settingModelUpdating: boolean;
  settingModelUpdateError: HttpErrorResponse | null;
}

export interface SettingsPartialState {
  readonly [SETTINGS_FEATURE_KEY]: SettingsState;
}

export const initialState: SettingsState = {
  settingModelCollection: [],
  settingModelCollectionLoading: false,
  settingModelCollectionLoadError: null,
  settingModelUpdating: false,
  settingModelUpdateError: null
};

export function settingsReducer(
  state: SettingsState = initialState,
  action: fromSettingsActions.CollectiveType
): SettingsState {
  switch (action.type) {
    case fromSettingsActions.Types.GetSettingModelCollection: {
      state = {
        ...state,
        settingModelCollection: [],
        settingModelCollectionLoading: true,
        settingModelCollectionLoadError: null
      };
      break;
    }

    case fromSettingsActions.Types.GetSettingModelCollectionFail: {
      state = {
        ...state,
        settingModelCollection: [],
        settingModelCollectionLoading: false,
        settingModelCollectionLoadError: action.payload
      };
      break;
    }

    case fromSettingsActions.Types.GetSettingModelCollectionSuccess: {
      state = {
        ...state,
        settingModelCollection: action.payload,
        settingModelCollectionLoading: false,
        settingModelCollectionLoadError: null
      };
      break;
    }

    case fromSettingsActions.Types.UpdateSettingModel: {
      state = {
        ...state,
        settingModelUpdating: true,
        settingModelUpdateError: null
      };
      break;
    }

    case fromSettingsActions.Types.UpdateSettingModelFail: {
      state = {
        ...state,
        settingModelUpdating: false,
        settingModelUpdateError: action.payload
      };
      break;
    }

    case fromSettingsActions.Types.UpdateSettingModelSuccess: {
      state = {
        ...state,
        settingModelCollection: [
          ...state.settingModelCollection.map(setting => {
            const patch = action.payload.patch.find(el => el.id === setting.id);
            if (patch) return { ...setting, value: patch.value };
            else return setting;
          })
        ],
        settingModelUpdating: false,
        settingModelUpdateError: null
      };
      break;
    }
  }

  return state;
}
