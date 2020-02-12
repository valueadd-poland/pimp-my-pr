import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  REPOSITORIES_STATISTICS_FEATURE_KEY,
  RepositoriesStatisticsState,
  selectAll
} from './repositories-statistics.reducer';

// Lookup the 'RepositoryStatistics' feature state managed by NgRx
const getRepositoryStatisticsState = createFeatureSelector<RepositoriesStatisticsState>(
  REPOSITORIES_STATISTICS_FEATURE_KEY
);

const getRepositoryStatisticsCollectionEntityState = createSelector(
  getRepositoryStatisticsState,
  state => state.repositoriesStatisticsCollection
);

const getRepositoryStatisticsCollection = createSelector(
  getRepositoryStatisticsCollectionEntityState,
  selectAll
);

const getRepositoryStatisticsCollectionLoading = createSelector(
  getRepositoryStatisticsState,
  state => state.repositoriesStatisticsCollectionLoading
);

const getRepositoryStatisticsCollectionLoadError = createSelector(
  getRepositoryStatisticsState,
  state => state.repositoriesStatisticsCollectionLoadError
);

export const repositoryStatisticsQuery = {
  getRepositoryStatisticsCollection,
  getRepositoryStatisticsCollectionLoading,
  getRepositoryStatisticsCollectionLoadError
};
