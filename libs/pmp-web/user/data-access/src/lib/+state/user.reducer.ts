import { fromUserActions } from './user.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { UserStatistics } from '@pimp-my-pr/shared/domain';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const USER_FEATURE_KEY = 'user';

export interface UserStatisticsEntityState extends EntityState<UserStatistics> {}
export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const adapter: EntityAdapter<UserStatistics> = createEntityAdapter<UserStatistics>();

export interface UserState {
  userStatisticsCollection: UserStatisticsEntityState;
  userStatisticsCollectionLoading: boolean;
  userStatisticsCollectionLoadError: HttpErrorResponse | null;
}

export const initialState: UserState = {
  userStatisticsCollection: adapter.getInitialState(),
  userStatisticsCollectionLoading: false,
  userStatisticsCollectionLoadError: null
};

export function userReducer(
  state: UserState = initialState,
  action: fromUserActions.CollectiveType
): UserState {
  switch (action.type) {
    case fromUserActions.Types.GetUserStatisticsCollection: {
      state = {
        ...state,
        userStatisticsCollection: adapter.getInitialState(),
        userStatisticsCollectionLoading: true,
        userStatisticsCollectionLoadError: null
      };
      break;
    }

    case fromUserActions.Types.GetUserStatisticsCollectionFail: {
      state = {
        ...state,
        userStatisticsCollection: adapter.getInitialState(),
        userStatisticsCollectionLoading: false,
        userStatisticsCollectionLoadError: action.payload
      };
      break;
    }

    case fromUserActions.Types.GetUserStatisticsCollectionSuccess: {
      state = {
        ...state,
        userStatisticsCollection: adapter.addAll(action.payload, state.userStatisticsCollection),
        userStatisticsCollectionLoading: false,
        userStatisticsCollectionLoadError: null
      };
      break;
    }
  }

  return state;
}

export const { selectAll } = adapter.getSelectors();
