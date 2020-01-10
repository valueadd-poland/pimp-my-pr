import { fromUserActions } from './user.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { UserStatistics } from '@pimp-my-pr/shared/domain';

export const USER_FEATURE_KEY = 'user';

export interface UserState {
  userStatisticsCollection: UserStatistics[];
  userStatisticsCollectionLoading: boolean;
  userStatisticsCollectionLoadError: HttpErrorResponse | null;
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const initialState: UserState = {
  userStatisticsCollection: [],
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
        userStatisticsCollection: [],
        userStatisticsCollectionLoading: true,
        userStatisticsCollectionLoadError: null
      };
      break;
    }

    case fromUserActions.Types.GetUserStatisticsCollectionFail: {
      state = {
        ...state,
        userStatisticsCollection: [],
        userStatisticsCollectionLoading: false,
        userStatisticsCollectionLoadError: action.payload
      };
      break;
    }

    case fromUserActions.Types.GetUserStatisticsCollectionSuccess: {
      state = {
        ...state,
        userStatisticsCollection: action.payload,
        userStatisticsCollectionLoading: false,
        userStatisticsCollectionLoadError: null
      };
      break;
    }
  }

  return state;
}
