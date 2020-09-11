import { statesEqual } from '@valueadd/testing';
import {
  initialState,
  settingsReducer,
  SettingsState
} from '@pimp-my-pr/pmp-web/repository/repository-settings/data-access';
import { fromSettingsActions } from './settings.actions';
import { RepositoryCommonSettingDataType } from '@pimp-my-pr/shared/domain';

describe('Settings Reducer', () => {
  let state: SettingsState;

  beforeEach(() => {
    state = { ...initialState };
  });

  describe('unknown action', () => {
    it('returns the initial state', () => {
      const action = {} as any;
      const result = settingsReducer(state, action);

      expect(result).toBe(state);
    });
  });

  describe('GetSettingsCollection', () => {
    it('sets settingsCollection, settingsCollectionLoading, settingsCollectionLoadError and does not modify other state properties', () => {
      const payload = {} as any;
      const action = new fromSettingsActions.GetSettingModelCollection();
      const result = settingsReducer(state, action);

      expect(result.settingModelCollection).toEqual([]);
      expect(result.settingModelCollectionLoading).toEqual(true);
      expect(result.settingModelUpdateError).toEqual(null);
      expect(
        statesEqual(result, state, [
          'settingModelCollection',
          'settingModelCollectionLoading',
          'settingModelCollectionLoadError'
        ])
      ).toBeTruthy();
    });
  });

  describe('GetSettingModelCollectionFail', () => {
    it('sets settingModelCollection, settingModelCollectionLoading, settingModelCollectionLoadError and does not modify other state properties', () => {
      const payload = {} as any;
      const action = new fromSettingsActions.GetSettingModelCollectionFail(payload);
      const result = settingsReducer(state, action);

      expect(result.settingModelCollection).toEqual([]);
      expect(result.settingModelCollectionLoading).toEqual(false);
      expect(result.settingModelCollectionLoadError).toEqual(payload);
      expect(
        statesEqual(result, state, [
          'settingModelCollection',
          'settingModelCollectionLoading',
          'settingModelCollectionLoadError'
        ])
      ).toBeTruthy();
    });
  });

  describe('GetSettingModelCollectionSuccess', () => {
    it('sets settingModelCollection, settingModelCollectionLoading, settingModelCollectionLoadError and does not modify other state properties', () => {
      const payload = {} as any;
      const action = new fromSettingsActions.GetSettingModelCollectionSuccess(payload);
      const result = settingsReducer(state, action);

      expect(result.settingModelCollection).toEqual(payload);
      expect(result.settingModelCollectionLoading).toEqual(false);
      expect(result.settingModelCollectionLoadError).toEqual(null);
      expect(
        statesEqual(result, state, [
          'settingModelCollection',
          'settingModelCollectionLoading',
          'settingModelCollectionLoadError'
        ])
      ).toBeTruthy();
    });
  });

  describe('Update Setting', () => {
    it('sets settingUpdating, settingUpdateError and does not modify other state properties', () => {
      const payload = {} as any;
      const action = new fromSettingsActions.UpdateSettingModel(payload);
      const result = settingsReducer(state, action);

      expect(result.settingModelUpdating).toEqual(true);
      expect(result.settingModelUpdateError).toEqual(null);
      expect(
        statesEqual(result, state, ['settingModelUpdating', 'settingModelUpdateError'])
      ).toBeTruthy();
    });
  });

  describe('Update Setting Fail', () => {
    it('sets settingUpdating, settingUpdateError and does not modify other state properties', () => {
      const payload = {} as any;
      const action = new fromSettingsActions.UpdateSettingModelFail(payload);
      const result = settingsReducer(state, action);

      expect(result.settingModelUpdating).toEqual(false);
      expect(result.settingModelUpdateError).toEqual(payload);
      expect(
        statesEqual(result, state, ['settingModelUpdating', 'settingModelUpdateError'])
      ).toBeTruthy();
    });
  });

  describe('Update Setting Success', () => {
    it('sets settingModelCollection, settingUpdating, settingUpdateError and does not modify other state properties', () => {
      const initial = {
        id: '1',
        value: 10,
        type: 'number' as RepositoryCommonSettingDataType,
        key: 'test',
        validators: []
      };
      state = {
        ...initialState,
        settingModelCollection: [initial]
      };
      const payload = {
        patch: [
          {
            id: '2',
            value: 11,
            type: 'number' as RepositoryCommonSettingDataType,
            key: 'test2',
            validators: []
          }
        ]
      };
      const action = new fromSettingsActions.UpdateSettingModelSuccess(payload);
      const result = settingsReducer(state, action);

      expect(result.settingModelCollection[0]).toEqual(initial);
      expect(result.settingModelUpdating).toEqual(false);
      expect(result.settingModelUpdateError).toEqual(null);
      expect(
        statesEqual(result, state, [
          'settingModelCollection',
          'settingModelUpdating',
          'settingModelUpdateError'
        ])
      ).toBeTruthy();
    });
  });
});
