import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Timeline } from '@pimp-my-pr/pmp-web/repository/domain';
import { GetPrTimelinePayload } from '@pimp-my-pr/pmp-web/repository/domain';

export namespace fromTimelineActions {
  export enum Types {
    GetTimeline = '[Repository pr timeline] Get Timeline',
    GetTimelineFail = '[Repository pr timeline] Get Timeline Fail',
    GetTimelineSuccess = '[Repository pr timeline] Get Timeline Success'
  }

  export class GetTimeline implements Action {
    readonly type = Types.GetTimeline;

    constructor(public payload: GetPrTimelinePayload) {}
  }

  export class GetTimelineFail implements Action {
    readonly type = Types.GetTimelineFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class GetTimelineSuccess implements Action {
    readonly type = Types.GetTimelineSuccess;

    constructor(public payload: Timeline) {}
  }

  export type CollectiveType = GetTimeline | GetTimelineSuccess | GetTimelineFail;
}
