import { TestBed } from '@angular/core/testing';
import { SettingsDataService } from './settings-data.service';
import { cold, hot } from 'jest-marbles';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SettingModel } from '@pimp-my-pr/pmp-web/repository/domain';
import { IResponse } from '@pimp-my-pr/shared/domain';

describe('SettingsDataService', () => {
  let service: SettingsDataService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsDataService],
      imports: [HttpClientTestingModule]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SettingsDataService);
  });

  describe('#getSettingModelCollection', () => {
    const response = {
      data: [{ id: 'xxx', value: 10, type: 'number', key: 'xxx', validators: [] }],
      error: null
    };

    afterEach(() => {
      http.verify();
    });

    it('should use correct url to make http call', () => {
      service.getSettingModelCollection().subscribe();
      const request = http.expectOne('/api/settings');
      expect(request.request.method).toBe('GET');
      request.flush(response);
    });
    it('should return user settings array', () => {
      service.getSettingModelCollection().subscribe(resp => {
        expect(resp).toBeInstanceOf(Array);
        expect(resp).toEqual(response.data);
      });
      const request = http.expectOne('/api/settings');
      request.flush(response);
    });
  });
  describe('#updateSettingModel', () => {
    const payload = { patch: [{ id: 'xxxx', value: 10 }] };
    afterEach(() => {
      http.verify();
    });

    it('should use correct url to make http call', () => {
      service.updateSettingModel(payload).subscribe();
      const request = http.expectOne('/api/settings');
      expect(request.request.method).toBe('PUT');
      request.flush({ error: null });
    });
  });
});
