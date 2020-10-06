import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  TIMELINE_FEATURE_KEY,
  initialState as timelineInitialState,
  timelineReducer
} from './+state/timeline.reducer';
import { TimelineEffects } from './+state/timeline.effects';
import { TimelineFacade } from './+state/timeline.facade';
import { TimelineDataService } from './services/timeline-data.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(TIMELINE_FEATURE_KEY, timelineReducer, {
      initialState: timelineInitialState
    }),
    EffectsModule.forFeature([TimelineEffects])
  ],
  providers: [TimelineFacade, TimelineDataService]
})
export class PmpWebRepositoryRepositoryPrTimelineDataAccessModule {}
