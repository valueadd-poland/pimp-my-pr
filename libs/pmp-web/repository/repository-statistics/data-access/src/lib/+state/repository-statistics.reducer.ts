import { fromSingleRepositoryStatisticsActions } from './repository-statistics.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { RepositoryModel } from '@pimp-my-pr/shared/domain';

export const SINGLEREPOSITORYSTATISTICS_FEATURE_KEY = 'singleRepositoryStatistics';

export interface SingleRepositoryStatisticsState {
  repositoryStatistics: RepositoryModel | null;
  repositoryStatisticsLoading: boolean;
  repositoryStatisticsLoadError: HttpErrorResponse | null;
}

export interface SingleRepositoryStatisticsPartialState {
  readonly [SINGLEREPOSITORYSTATISTICS_FEATURE_KEY]: SingleRepositoryStatisticsState;
}

export const initialState: SingleRepositoryStatisticsState = {
  repositoryStatistics: null,
  repositoryStatisticsLoading: false,
  repositoryStatisticsLoadError: null
};

export function repositoryStatisticsReducer(
  state: SingleRepositoryStatisticsState = initialState,
  action: fromSingleRepositoryStatisticsActions.CollectiveType
): SingleRepositoryStatisticsState {
  switch (action.type) {
    case fromSingleRepositoryStatisticsActions.Types.GetRepositoryStatistics: {
      state = {
        ...state,
        repositoryStatistics: null,
        repositoryStatisticsLoading: true,
        repositoryStatisticsLoadError: null
      };
      break;
    }

    case fromSingleRepositoryStatisticsActions.Types.GetRepositoryStatisticsFail: {
      state = {
        ...state,
        repositoryStatistics: null,
        repositoryStatisticsLoading: false,
        repositoryStatisticsLoadError: action.payload
      };
      break;
    }

    case fromSingleRepositoryStatisticsActions.Types.GetRepositoryStatisticsSuccess: {
      state = {
        ...state,
        repositoryStatistics: action.payload,
        repositoryStatisticsLoading: false,
        repositoryStatisticsLoadError: null
      };
      break;
    }
  }

  return state;
}
