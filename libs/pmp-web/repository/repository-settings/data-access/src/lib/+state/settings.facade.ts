import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SettingsPartialState } from './settings.reducer';
import { settingsQuery } from './settings.selectors';
import { fromSettingsActions } from './settings.actions';
import { UpdateSettingModelPayload } from '@pimp-my-pr/pmp-web/repository/domain';
import { ActionStatusResolverService } from '@pimp-my-pr/pmp-web/shared/util-ngrx';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsFacade {
  settingModelCollection$ = this.store.pipe(select(settingsQuery.getSettingModelCollection));
  settingModelCollectionLoading$ = this.store.pipe(
    select(settingsQuery.getSettingModelCollectionLoading)
  );
  settingModelCollectionLoadError$ = this.store.pipe(
    select(settingsQuery.getSettingModelCollectionLoadError)
  );
  settingModelUpdating$ = this.store.pipe(select(settingsQuery.getSettingModelUpdating));
  settingModelUpdateError$ = this.store.pipe(select(settingsQuery.getSettingModelUpdateError));
  constructor(
    private store: Store<SettingsPartialState>,
    private actionStatusResolverService: ActionStatusResolverService
  ) {}

  getSettingModelCollection(): void {
    this.store.dispatch(new fromSettingsActions.GetSettingModelCollection());
  }

  updateSettingModel(data: UpdateSettingModelPayload): Observable<void> {
    return this.actionStatusResolverService.resolve(
      new fromSettingsActions.UpdateSettingModel(data),
      fromSettingsActions.Types.UpdateSettingModelSuccess,
      fromSettingsActions.Types.UpdateSettingModelFail
    );
  }
}
