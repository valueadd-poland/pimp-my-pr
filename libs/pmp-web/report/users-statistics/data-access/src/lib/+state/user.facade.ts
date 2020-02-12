import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UserPartialState } from './user.reducer';
import { userQuery } from './user.selectors';
import { fromUserActions } from './user.actions';
import { GetUserStatisticsCollectionPayload } from '@pimp-my-pr/pmp-web/report/domain';

@Injectable()
export class UserFacade {
  userStatisticsCollection$ = this.store.pipe(select(userQuery.getUserStatisticsCollection));
  userStatisticsCollectionLoading$ = this.store.pipe(
    select(userQuery.getUserStatisticsCollectionLoading)
  );
  userStatisticsCollectionLoadError$ = this.store.pipe(
    select(userQuery.getUserStatisticsCollectionLoadError)
  );
  constructor(private store: Store<UserPartialState>) {}

  getUserStatisticsCollection(data: GetUserStatisticsCollectionPayload): void {
    this.store.dispatch(new fromUserActions.GetUserStatisticsCollection(data));
  }
}
