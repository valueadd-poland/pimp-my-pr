import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { fromTimelineActions } from './timeline.actions';
import { TimelinePartialState } from './timeline.reducer';
import { TimelineDataService } from '../services/timeline-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TimelineEffects {
  @Effect()
  getTimeline$ = this.dp.fetch(fromTimelineActions.Types.GetTimeline, {
    run: (action: fromTimelineActions.GetTimeline) => {
      return this.timelineDataService
        .getTimeline(action.payload)
        .pipe(map(data => new fromTimelineActions.GetTimelineSuccess(data)));
    },
    onError: (action: fromTimelineActions.GetTimeline, error: HttpErrorResponse) => {
      return new fromTimelineActions.GetTimelineFail(error);
    }
  });

  constructor(
    private dp: DataPersistence<TimelinePartialState>,
    private timelineDataService: TimelineDataService
  ) {}
}
