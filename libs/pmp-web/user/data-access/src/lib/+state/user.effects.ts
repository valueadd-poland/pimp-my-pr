import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { fromUserActions } from './user.actions';
import { UserPartialState } from './user.reducer';
import { UserDataService } from '../services/user-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UserEffects {
  @Effect()
  getUserStatisticsCollection$ = this.dp.fetch(fromUserActions.Types.GetUserStatisticsCollection, {
    run: (action: fromUserActions.GetUserStatisticsCollection) => {
      return this.userDataService
        .getUserStatisticsCollection(action.payload)
        .pipe(map(data => new fromUserActions.GetUserStatisticsCollectionSuccess(data)));
    },
    onError: (action: fromUserActions.GetUserStatisticsCollection, error: HttpErrorResponse) => {
      return new fromUserActions.GetUserStatisticsCollectionFail(error);
    }
  });

  constructor(
    private dp: DataPersistence<UserPartialState>,
    private userDataService: UserDataService
  ) {}
}
