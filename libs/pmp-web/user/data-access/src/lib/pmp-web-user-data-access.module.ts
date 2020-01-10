import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  USER_FEATURE_KEY,
  initialState as userInitialState,
  userReducer
} from './+state/user.reducer';
import { UserEffects } from './+state/user.effects';
import { UserFacade } from './+state/user.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer, { initialState: userInitialState }),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [UserFacade]
})
export class PmpWebUserDataAccessModule {}
