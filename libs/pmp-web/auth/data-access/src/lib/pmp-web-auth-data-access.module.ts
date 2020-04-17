import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';
import {
  AUTH_FEATURE_KEY,
  authReducer,
  initialState as authInitialState
} from './+state/auth.reducer';
import { AuthDataService } from './services/auth-data.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer, { initialState: authInitialState }),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthFacade, AuthDataService]
})
export class PmpWebAuthDataAccessModule {}
