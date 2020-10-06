import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TimelinePartialState } from './timeline.reducer';
import { timelineQuery } from './timeline.selectors';
import { fromTimelineActions } from './timeline.actions';
import {
  GetPrTimelinePayload,
  TimelineChartRange,
  TimelineTotalStats
} from '@pimp-my-pr/pmp-web/repository/domain';
import { Observable } from 'rxjs';

@Injectable()
export class TimelineFacade {
  timelineRecords$ = this.store.pipe(select(timelineQuery.getTimelineRecords));
  timelineLoading$ = this.store.pipe(select(timelineQuery.getLoading));
  timelineError$ = this.store.pipe(select(timelineQuery.getError));
  timelineProperties$ = this.store.pipe(select(timelineQuery.getTimelineProperties));

  getTotalStats(range: TimelineChartRange): Observable<TimelineTotalStats> {
    return this.store.pipe(select(timelineQuery.getTimelineTotalStats, range));
  }

  constructor(private store: Store<TimelinePartialState>) {}

  getTimeline(data: GetPrTimelinePayload): void {
    this.store.dispatch(new fromTimelineActions.GetTimeline(data));
  }
}
