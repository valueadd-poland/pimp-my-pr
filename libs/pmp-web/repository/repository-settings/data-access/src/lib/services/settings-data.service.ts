import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlFactory } from '@valueadd/typed-urls';
import { SettingModel, UpdateSettingModelPayload } from '@pimp-my-pr/pmp-web/repository/domain';
import { map } from 'rxjs/operators';
import { IResponse } from '@pimp-my-pr/shared/domain';

@Injectable()
export class SettingsDataService {
  readonly endpoints = {
    getSettingModelCollection: urlFactory('/api/settings'),
    updateSettingModel: urlFactory('/api/settings')
  };
  constructor(private http: HttpClient) {}

  getSettingModelCollection(): Observable<SettingModel[]> {
    return this.http
      .get<IResponse<SettingModel[]>>(this.endpoints.getSettingModelCollection.url())
      .pipe(map(resp => resp.data));
  }

  updateSettingModel(payload: UpdateSettingModelPayload): Observable<void> {
    return this.http.put<void>(this.endpoints.updateSettingModel.url(), payload);
  }
}
