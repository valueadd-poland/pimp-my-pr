import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { fromSettingsActions } from './settings.actions';
import { SettingsPartialState } from './settings.reducer';
import { SettingsDataService } from '../services/settings-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class SettingsEffects {
  @Effect()
  getSettingModelCollection$ = this.dp.fetch(fromSettingsActions.Types.GetSettingModelCollection, {
    id: () => {},
    run: (action: fromSettingsActions.GetSettingModelCollection) => {
      return this.settingsDataService
        .getSettingModelCollection()
        .pipe(map(data => new fromSettingsActions.GetSettingModelCollectionSuccess(data)));
    },
    onError: (action: fromSettingsActions.GetSettingModelCollection, error: HttpErrorResponse) => {
      return new fromSettingsActions.GetSettingModelCollectionFail(error);
    }
  });

  @Effect()
  updateSettingModel$ = this.dp.pessimisticUpdate(fromSettingsActions.Types.UpdateSettingModel, {
    run: (action: fromSettingsActions.UpdateSettingModel) => {
      return this.settingsDataService
        .updateSettingModel(action.payload)
        .pipe(map(data => new fromSettingsActions.UpdateSettingModelSuccess(action.payload)));
    },
    onError: (action: fromSettingsActions.UpdateSettingModel, error: HttpErrorResponse) => {
      return new fromSettingsActions.UpdateSettingModelFail(error);
    }
  });

  constructor(
    private dp: DataPersistence<SettingsPartialState>,
    private settingsDataService: SettingsDataService
  ) {}
}
