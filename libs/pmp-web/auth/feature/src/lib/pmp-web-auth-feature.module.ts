import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { AuthFeatureEffects } from './+state/auth-feature.effects';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([AuthFeatureEffects])]
})
export class PmpWebAuthFeatureModule {}
