import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlFactory } from '@valueadd/typed-urls';
import { GetPrTimelinePayload, Timeline } from '@pimp-my-pr/pmp-web/repository/domain';
import { IResponse, urlWithQueryParams } from '@pimp-my-pr/shared/domain';
import { map } from 'rxjs/operators';

@Injectable()
export class TimelineDataService {
  readonly endpoints = {
    getTimeline: urlFactory<'id'>('/api/timeline/pr/:id', true)
  };
  constructor(private http: HttpClient) {}

  getTimeline(payload: GetPrTimelinePayload): Observable<Timeline> {
    const { repositoryId, ...query } = payload;
    return this.http
      .get<IResponse<Timeline>>(
        urlWithQueryParams(this.endpoints.getTimeline.url({ id: repositoryId }), {
          ...query
        })
      )
      .pipe(
        map(resp => resp.data),
        map(resp => ({
          ...resp,
          data: resp.data.map(record => ({ ...record, dataFrom: new Date(record.dataFrom) }))
        }))
      );
  }
}
