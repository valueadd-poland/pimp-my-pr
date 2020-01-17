import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  REPOSITORY_STATISTICS_FEATURE_KEY,
  RepositoryStatisticsState,
  selectAll
} from './repository-statistics.reducer';

// Lookup the 'RepositoryStatistics' feature state managed by NgRx
const getRepositoryStatisticsState = createFeatureSelector<RepositoryStatisticsState>(
  REPOSITORY_STATISTICS_FEATURE_KEY
);

const getRepositoryStatisticsCollectionEntityState = createSelector(
  getRepositoryStatisticsState,
  state => state.repositoryStatisticsCollection
);

const getRepositoryStatisticsCollection = createSelector(
  getRepositoryStatisticsCollectionEntityState,
  selectAll
);

const getRepositoryStatisticsCollectionLoading = createSelector(
  getRepositoryStatisticsState,
  state => state.repositoryStatisticsCollectionLoading
);

const getRepositoryStatisticsCollectionLoadError = createSelector(
  getRepositoryStatisticsState,
  state => state.repositoryStatisticsCollectionLoadError
);

export const repositoryStatisticsQuery = {
  getRepositoryStatisticsCollection,
  getRepositoryStatisticsCollectionLoading,
  getRepositoryStatisticsCollectionLoadError
};
