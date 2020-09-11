import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { cold, hot } from 'jest-marbles';
import { SettingsDataService } from '../services/settings-data.service';
import { SettingsEffects } from './settings.effects';
import { createSpyObj } from 'jest-createspyobj';
import { fromSettingsActions } from './settings.actions';

describe('TestEffects', () => {
  let settingsDataService: jest.Mocked<SettingsDataService>;
  let actions: Observable<any>;
  let effects: SettingsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SettingsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore({ initialState: {} }),
        {
          provide: SettingsDataService,
          useValue: createSpyObj(SettingsDataService)
        }
      ]
    });

    effects = TestBed.get(SettingsEffects);
    settingsDataService = TestBed.get(SettingsDataService);
  });

  describe('getSettingCollection$', () => {
    it('returns GetSettingModelCollectionSuccess action on success', () => {
      const payload = {} as any;
      const action = new fromSettingsActions.GetSettingModelCollection();
      const completion = new fromSettingsActions.GetSettingModelCollectionSuccess(payload);

      actions = hot('-a', { a: action });
      const response = cold('--b|', { b: payload });
      const expected = cold('---c', { c: completion });
      settingsDataService.getSettingModelCollection.mockReturnValue(response);

      expect(effects.getSettingModelCollection$).toSatisfyOnFlush(() => {
        expect(settingsDataService.getSettingModelCollection).toHaveBeenCalled();
      });
      expect(effects.getSettingModelCollection$).toBeObservable(expected);
    });

    it('returns GetEntityCollectionFail action on fail', () => {
      const payload = {} as any;
      const action = new fromSettingsActions.GetSettingModelCollection();
      const completion = new fromSettingsActions.GetSettingModelCollectionFail(payload);

      actions = hot('-a', { a: action });
      const response = cold('-#', {}, payload);
      const expected = cold('--c', { c: completion });
      settingsDataService.getSettingModelCollection.mockReturnValue(response);

      expect(effects.getSettingModelCollection$).toSatisfyOnFlush(() => {
        expect(settingsDataService.getSettingModelCollection).toHaveBeenCalled();
      });
      expect(effects.getSettingModelCollection$).toBeObservable(expected);
    });
  });

  describe('updateEntity$', () => {
    it('returns UpdateEntitySuccess action on success', () => {
      const payload = { patch: [{ id: 'xxx', value: 10 }] };
      const action = new fromSettingsActions.UpdateSettingModel(payload);
      const completion = new fromSettingsActions.UpdateSettingModelSuccess(payload);

      actions = hot('-a', { a: action });
      const response = cold('--b|', { b: payload });
      const expected = cold('---c', { c: completion });
      settingsDataService.updateSettingModel.mockReturnValue(response);

      expect(effects.updateSettingModel$).toSatisfyOnFlush(() => {
        expect(settingsDataService.updateSettingModel).toHaveBeenCalled();
      });
      expect(effects.updateSettingModel$).toBeObservable(expected);
    });

    it('returns UpdateEntityFail action on fail', () => {
      const payload = {} as any;
      const action = new fromSettingsActions.UpdateSettingModel(payload);
      const completion = new fromSettingsActions.UpdateSettingModelFail({} as any);

      actions = hot('-a', { a: action });
      const response = cold('-#', {}, payload);
      const expected = cold('--c', { c: completion });
      settingsDataService.updateSettingModel.mockReturnValue(response);

      expect(effects.updateSettingModel$).toSatisfyOnFlush(() => {
        expect(settingsDataService.updateSettingModel).toHaveBeenCalled();
      });
      expect(effects.updateSettingModel$).toBeObservable(expected);
    });
  });
});
