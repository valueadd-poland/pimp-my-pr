import { fromTimelineActions } from './timeline.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { TimelineProperties, TimelineRecord } from '@pimp-my-pr/pmp-web/repository/domain';

export const TIMELINE_FEATURE_KEY = 'repository-pr-timeline';

export interface TimelineState {
  timelineProperties: TimelineProperties | null;
  timelineRecords: TimelineRecord[];
  timelineLoading: boolean;
  timelineError: HttpErrorResponse | null;
}

export interface TimelinePartialState {
  readonly [TIMELINE_FEATURE_KEY]: TimelineState;
}

export const initialState: TimelineState = {
  timelineProperties: null,
  timelineRecords: [],
  timelineLoading: false,
  timelineError: null
};

export function timelineReducer(
  state: TimelineState = initialState,
  action: fromTimelineActions.CollectiveType
): TimelineState {
  switch (action.type) {
    case fromTimelineActions.Types.GetTimeline: {
      state = {
        ...state,
        timelineRecords: [],
        timelineProperties: null,
        timelineLoading: true,
        timelineError: null
      };
      break;
    }

    case fromTimelineActions.Types.GetTimelineFail: {
      state = {
        ...state,
        timelineLoading: false,
        timelineError: action.payload
      };
      break;
    }

    case fromTimelineActions.Types.GetTimelineSuccess: {
      const { data, ...properties } = action.payload;
      state = {
        ...state,
        timelineProperties: properties,
        timelineRecords: data,
        timelineLoading: false,
        timelineError: null
      };
      break;
    }
  }

  return state;
}
