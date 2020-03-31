import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {
  authFeatureReducer,
  AUTH_FEATURE_FEATURE_KEY,
  initialState
} from './+state/auth-feature.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthFeatureEffects } from './+state/auth-feature.effects';
import { AuthFeatureFacade } from './+state/auth-feature.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(AUTH_FEATURE_FEATURE_KEY, authFeatureReducer, {
      initialState
    }),
    EffectsModule.forFeature([AuthFeatureEffects])
  ],
  providers: [AuthFeatureFacade]
})
export class PmpWebAuthAuthFeatureModule {}
