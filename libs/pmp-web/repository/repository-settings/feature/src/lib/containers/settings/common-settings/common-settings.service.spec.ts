import { TestBed } from '@angular/core/testing';
import { CommonSettingsService } from './common-settings.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('CommonSettingsService', () => {
  let service: CommonSettingsService;
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonSettingsService],
      imports: [ReactiveFormsModule]
    });
    service = TestBed.inject(CommonSettingsService);
    fb = TestBed.inject(FormBuilder);
  });

  describe('#getFormGroupFromSettings', () => {
    it('should generate correct form group', () => {
      const config = service.getFormGroupFromSettings([
        {
          key: 'key1',
          validators: [],
          value: 10,
          type: 'number',
          id: '1'
        },
        {
          key: 'key2',
          validators: [],
          value: false,
          type: 'boolean',
          id: '3'
        }
      ]);

      expect(config.controls).toHaveProperty('1');
      expect(config.controls).toHaveProperty('3');
      expect(config.controls['1'].value).toBe(10);
      expect(config.controls['3'].value).toBe(false);
    });
  });
  describe('#getSettingTranslation', () => {
    it('should return translated key if key exists', () => {
      expect(service.getSettingTranslation('maxPendingPR')).not.toBe('maxPendingPR');
    });
    it('should return key if key does not exist', () => {
      expect(service.getSettingTranslation('abc')).toBe('abc');
    });
  });
  describe('#getSettingsToUpdate', () => {
    it('should return only dirty fields in desired format', () => {
      const form = fb.group({
        input1: 1,
        input2: 2
      });
      form.controls.input1.markAsDirty();
      expect(service.getSettingsToUpdate(form)).toEqual([{ id: 'input1', value: 1 }]);
    });
  });
});
