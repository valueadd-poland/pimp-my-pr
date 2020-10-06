import { Component } from '@angular/core';
import { TimelineFacade } from '@pimp-my-pr/pmp-web/repository/repository-pr-timeline/data-access';
import { combineLatest, Observable } from 'rxjs';
import {
  GetPrTimelinePayload,
  Timeline,
  TimelineChartRange,
  TimelineProperties,
  TimelineRecord,
  TimelineSettings,
  TimelineTotalStats
} from '@pimp-my-pr/pmp-web/repository/domain';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PrTimelineStateType } from './pr-timeline-state.type';

@Component({
  selector: 'pimp-my-pr-repository-pr-timeline',
  templateUrl: './pr-timeline.component.html',
  styleUrls: ['./pr-timeline.component.scss']
})
export class PrTimelineComponent {
  timelineState$: Observable<PrTimelineStateType>;
  records$: Observable<TimelineRecord[]>;
  timelineTotalStats$: Observable<TimelineTotalStats>;
  repositoryId: string;

  constructor(private timelineFacade: TimelineFacade, private activatedRoute: ActivatedRoute) {
    this.records$ = timelineFacade.timelineRecords$;
    this.timelineTotalStats$ = timelineFacade.getTotalStats({ fromDate: null, toDate: null });
    this.timelineState$ = combineLatest([
      timelineFacade.timelineError$,
      timelineFacade.timelineLoading$,
      timelineFacade.timelineProperties$
    ]).pipe(
      map(
        ([error, loading, props]): PrTimelineStateType => {
          if (props) return 'ready';
          else if (error) return 'error';
          else if (loading) return 'loading';
          else return 'empty';
        }
      )
    );
    this.activatedRoute.paramMap
      .pipe(map(params => params.get('repositoryId')))
      .subscribe(id => (this.repositoryId = id));
  }

  handleTimelineRangeUpdated(range: TimelineChartRange): void {
    this.timelineTotalStats$ = this.timelineFacade.getTotalStats(range);
  }

  handleSettingsUpdated(settings: TimelineSettings): void {
    const query: GetPrTimelinePayload = {
      repositoryId: this.repositoryId,
      ...settings
    };
    this.timelineFacade.getTimeline(query);
  }
}
