import { HttpErrorResponse } from '@angular/common/http';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { RepositoryStatistics } from '@pimp-my-pr/shared/domain';
import { fromRepositoriesStatisticsActions } from './repositories-statistics.actions';

export const REPOSITORIES_STATISTICS_FEATURE_KEY = 'repositoriesStatistics';

export interface RepositoriesStatisticsEntityState extends EntityState<RepositoryStatistics> {}
export interface RepositoriesStatisticsPartialState {
  readonly [REPOSITORIES_STATISTICS_FEATURE_KEY]: RepositoriesStatisticsState;
}

export const adapter: EntityAdapter<RepositoryStatistics> = createEntityAdapter<
  RepositoryStatistics
>();

export interface RepositoriesStatisticsState {
  repositoriesStatisticsCollection: RepositoriesStatisticsEntityState;
  repositoriesStatisticsCollectionLoading: boolean;
  repositoriesStatisticsCollectionLoadError: HttpErrorResponse | null;
}

export const initialState: RepositoriesStatisticsState = {
  repositoriesStatisticsCollection: adapter.getInitialState(),
  repositoriesStatisticsCollectionLoading: false,
  repositoriesStatisticsCollectionLoadError: null
};

export function repositoriesStatisticsReducer(
  state: RepositoriesStatisticsState = initialState,
  action: fromRepositoriesStatisticsActions.CollectiveType
): RepositoriesStatisticsState {
  switch (action.type) {
    case fromRepositoriesStatisticsActions.Types.GetRepositoriesStatisticsCollection: {
      state = {
        ...state,
        repositoriesStatisticsCollection: adapter.getInitialState(),
        repositoriesStatisticsCollectionLoading: true,
        repositoriesStatisticsCollectionLoadError: null
      };
      break;
    }

    case fromRepositoriesStatisticsActions.Types.GetRepositoriesStatisticsCollectionFail: {
      state = {
        ...state,
        repositoriesStatisticsCollection: adapter.getInitialState(),
        repositoriesStatisticsCollectionLoading: false,
        repositoriesStatisticsCollectionLoadError: action.payload
      };
      break;
    }

    case fromRepositoriesStatisticsActions.Types.GetRepositoriesStatisticsCollectionSuccess: {
      state = {
        ...state,
        repositoriesStatisticsCollection: adapter.addAll(
          action.payload,
          state.repositoriesStatisticsCollection
        ),
        repositoriesStatisticsCollectionLoading: false,
        repositoriesStatisticsCollectionLoadError: null
      };
      break;
    }
  }

  return state;
}

export const { selectAll } = adapter.getSelectors();
