import { fromSingleUserStatisticsActions } from './single-user-statistics.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleUserStatisticsResponse } from '@pimp-my-pr/shared/domain';

export const SINGLEUSERSTATISTICS_FEATURE_KEY = 'singleUserStatistics';

export interface SingleUserStatisticsState {
  singleUserStatisticsResponse: SingleUserStatisticsResponse | null;
  singleUserStatisticsResponseLoading: boolean;
  singleUserStatisticsResponseLoadError: HttpErrorResponse | null;
}

export interface SingleUserStatisticsPartialState {
  readonly [SINGLEUSERSTATISTICS_FEATURE_KEY]: SingleUserStatisticsState;
}

export const initialState: SingleUserStatisticsState = {
  singleUserStatisticsResponse: null,
  singleUserStatisticsResponseLoading: false,
  singleUserStatisticsResponseLoadError: null
};

export function singleUserStatisticsReducer(
  state: SingleUserStatisticsState = initialState,
  action: fromSingleUserStatisticsActions.CollectiveType
): SingleUserStatisticsState {
  switch (action.type) {
    case fromSingleUserStatisticsActions.Types.GetSingleUserStatisticsResponse: {
      state = {
        ...state,
        singleUserStatisticsResponse: null,
        singleUserStatisticsResponseLoading: true,
        singleUserStatisticsResponseLoadError: null
      };
      break;
    }

    case fromSingleUserStatisticsActions.Types.GetSingleUserStatisticsResponseFail: {
      state = {
        ...state,
        singleUserStatisticsResponse: null,
        singleUserStatisticsResponseLoading: false,
        singleUserStatisticsResponseLoadError: action.payload
      };
      break;
    }

    case fromSingleUserStatisticsActions.Types.GetSingleUserStatisticsResponseSuccess: {
      state = {
        ...state,
        singleUserStatisticsResponse: action.payload,
        singleUserStatisticsResponseLoading: false,
        singleUserStatisticsResponseLoadError: null
      };
      break;
    }
  }

  return state;
}
