import { fromRepositoryStatisticsActions } from './repository-statistics.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { RepositoryStatistics } from '@pimp-my-pr/shared/domain';

export const REPOSITORY_STATISTICS_FEATURE_KEY = 'repositoryStatistics';

export interface RepositoryStatisticsEntityState extends EntityState<RepositoryStatistics> {}
export interface RepositoryStatisticsPartialState {
  readonly [REPOSITORY_STATISTICS_FEATURE_KEY]: RepositoryStatisticsState;
}

export const adapter: EntityAdapter<RepositoryStatistics> = createEntityAdapter<
  RepositoryStatistics
>();

export interface RepositoryStatisticsState {
  repositoryStatisticsCollection: RepositoryStatisticsEntityState;
  repositoryStatisticsCollectionLoading: boolean;
  repositoryStatisticsCollectionLoadError: HttpErrorResponse | null;
}

export const initialState: RepositoryStatisticsState = {
  repositoryStatisticsCollection: adapter.getInitialState(),
  repositoryStatisticsCollectionLoading: false,
  repositoryStatisticsCollectionLoadError: null
};

export function repositoryStatisticsReducer(
  state: RepositoryStatisticsState = initialState,
  action: fromRepositoryStatisticsActions.CollectiveType
): RepositoryStatisticsState {
  switch (action.type) {
    case fromRepositoryStatisticsActions.Types.GetRepositoryStatisticsCollection: {
      state = {
        ...state,
        repositoryStatisticsCollection: adapter.getInitialState(),
        repositoryStatisticsCollectionLoading: true,
        repositoryStatisticsCollectionLoadError: null
      };
      break;
    }

    case fromRepositoryStatisticsActions.Types.GetRepositoryStatisticsCollectionFail: {
      state = {
        ...state,
        repositoryStatisticsCollection: adapter.getInitialState(),
        repositoryStatisticsCollectionLoading: false,
        repositoryStatisticsCollectionLoadError: action.payload
      };
      break;
    }

    case fromRepositoryStatisticsActions.Types.GetRepositoryStatisticsCollectionSuccess: {
      state = {
        ...state,
        repositoryStatisticsCollection: adapter.addAll(
          action.payload,
          state.repositoryStatisticsCollection
        ),
        repositoryStatisticsCollectionLoading: false,
        repositoryStatisticsCollectionLoadError: null
      };
      break;
    }
  }

  return state;
}

export const { selectAll } = adapter.getSelectors();
