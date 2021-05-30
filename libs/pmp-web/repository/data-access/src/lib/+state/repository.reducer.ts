import { HttpErrorResponse } from '@angular/common/http';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Repository } from '@pimp-my-pr/pmp-web/repository/domain';
import { fromRepositoryActions } from './repository.actions';

export const REPOSITORY_FEATURE_KEY = 'repository';

export interface RepositoryEntityState extends EntityState<Repository> {}

export interface RepositoryState {
  repositoryCollection: RepositoryEntityState;
  repositoryCollectionLoading: boolean;
  repositoryCollectionLoadError: HttpErrorResponse | null;
  addingRepository: boolean;
  addingRepositoryError: HttpErrorResponse | null;
}

export interface RepositoryPartialState {
  readonly [REPOSITORY_FEATURE_KEY]: RepositoryState;
}

export const adapter: EntityAdapter<Repository> = createEntityAdapter<Repository>();

export const initialState: RepositoryState = {
  repositoryCollection: adapter.getInitialState(),
  repositoryCollectionLoading: false,
  repositoryCollectionLoadError: null,
  addingRepository: false,
  addingRepositoryError: null
};

export function repositoryReducer(
  state: RepositoryState = initialState,
  action: fromRepositoryActions.CollectiveType
): RepositoryState {
  switch (action.type) {
    case fromRepositoryActions.Types.GetRepositoryCollection: {
      state = {
        ...state,
        repositoryCollection: adapter.getInitialState(),
        repositoryCollectionLoading: true,
        repositoryCollectionLoadError: null
      };
      break;
    }

    case fromRepositoryActions.Types.GetRepositoryCollectionFail: {
      state = {
        ...state,
        repositoryCollection: adapter.getInitialState(),
        repositoryCollectionLoading: false,
        repositoryCollectionLoadError: action.payload
      };
      break;
    }

    case fromRepositoryActions.Types.GetRepositoryCollectionSuccess: {
      state = {
        ...state,
        repositoryCollection: adapter.addMany(action.payload, state.repositoryCollection),
        repositoryCollectionLoading: false,
        repositoryCollectionLoadError: null
      };
      break;
    }

    case fromRepositoryActions.Types.AddRepository: {
      state = {
        ...state,
        addingRepository: true,
        addingRepositoryError: null
      };
      break;
    }

    case fromRepositoryActions.Types.AddRepositoryFail: {
      state = {
        ...state,
        addingRepository: false,
        addingRepositoryError: action.payload
      };
      break;
    }

    case fromRepositoryActions.Types.AddRepositorySuccess: {
      state = {
        ...state,
        addingRepository: false,
        addingRepositoryError: null
      };
      break;
    }
  }

  return state;
}
