import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SingleUserStatisticsPartialState } from './single-user-statistics.reducer';
import { singleUserStatisticsQuery } from './single-user-statistics.selectors';
import { fromSingleUserStatisticsActions } from './single-user-statistics.actions';
import { GetSingleUserStatisticsResponseRequestPayload } from '../resources/request-payloads/get-single-user-statistics-response.request-payload';

@Injectable()
export class SingleUserStatisticsFacade {
  // TODO Remove 'Response' from name
  singleUserStatisticsResponse$ = this.store.pipe(
    select(singleUserStatisticsQuery.getSingleUserStatisticsResponse)
  );
  singleUserStatisticsResponseLoading$ = this.store.pipe(
    select(singleUserStatisticsQuery.getSingleUserStatisticsResponseLoading)
  );
  singleUserStatisticsResponseLoadError$ = this.store.pipe(
    select(singleUserStatisticsQuery.getSingleUserStatisticsResponseLoadError)
  );

  constructor(private store: Store<SingleUserStatisticsPartialState>) {}

  getSingleUserStatisticsResponse(data: GetSingleUserStatisticsResponseRequestPayload): void {
    this.store.dispatch(new fromSingleUserStatisticsActions.GetSingleUserStatisticsResponse(data));
  }
}
