import { ValidationMessagesService, ValidationMessagesConfig } from '@valueadd/validation-messages';
import { NgModule } from '@angular/core';

@NgModule()
export class ValidationModule {
  errorMessages: ValidationMessagesConfig = {
    email: 'Invalid e-mail address.',
    length: 'This field should be {{value}} characters long.',
    max: 'This field value should be lower than {{value}}.',
    maxlength: 'This field should have maximum {{value}} characters.',
    min: 'This field value should be greater than {{value}}.',
    minlength: 'This field should contain at least {{value}} characters.',
    required: 'This field is required.',
    notInteger: 'Integer required',
    toManyDecimalPlaces: 'To many decimal places',
    pattern: {
      message: 'patternIssue',
      validatorValue: 'requiredPattern',
      pattern: '^[a-zA-Z]*$'
    }
  };

  constructor(private validationMessageService: ValidationMessagesService) {
    this.validationMessageService.setValidationMessages(this.errorMessages);
  }
}
