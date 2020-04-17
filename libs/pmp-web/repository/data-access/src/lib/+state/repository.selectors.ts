import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll } from '@pimp-my-pr/pmp-web/repository/repositories-statistics/data-access';
import { REPOSITORY_FEATURE_KEY, RepositoryState } from './repository.reducer';

// Lookup the 'RepositorySettings' feature state managed by NgRx
const getRepositoryState = createFeatureSelector<RepositoryState>(REPOSITORY_FEATURE_KEY);

const getRepositoryCollectionEntityState = createSelector(
  getRepositoryState,
  state => state.repositoryCollection
);

const getRepositoryCollection = createSelector(
  getRepositoryCollectionEntityState,
  selectAll
);

const getRepositoryCollectionLoading = createSelector(
  getRepositoryState,
  state => state.repositoryCollectionLoading
);

const getRepositoryCollectionLoadError = createSelector(
  getRepositoryState,
  state => state.repositoryCollectionLoadError
);

const getAddingRepository = createSelector(
  getRepositoryState,
  state => state.addingRepository
);

const getAddingRepositoryError = createSelector(
  getRepositoryState,
  state => state.addingRepositoryError
);

export const repositoryQuery = {
  getRepositoryCollection,
  getRepositoryCollectionLoading,
  getRepositoryCollectionLoadError,
  getAddingRepository,
  getAddingRepositoryError
};
