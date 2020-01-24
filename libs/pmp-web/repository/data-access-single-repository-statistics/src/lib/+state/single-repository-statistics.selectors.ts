import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SINGLEREPOSITORYSTATISTICS_FEATURE_KEY,
  SingleRepositoryStatisticsState
} from './single-repository-statistics.reducer';

// Lookup the 'SingleRepositoryStatistics' feature state managed by NgRx
const getSingleRepositoryStatisticsState = createFeatureSelector<SingleRepositoryStatisticsState>(
  SINGLEREPOSITORYSTATISTICS_FEATURE_KEY
);

const getRepositoryStatistics = createSelector(
  getSingleRepositoryStatisticsState,
  state => state.repositoryStatistics
);

const getRepositoryStatisticsLoading = createSelector(
  getSingleRepositoryStatisticsState,
  state => state.repositoryStatisticsLoading
);

const getRepositoryStatisticsLoadError = createSelector(
  getSingleRepositoryStatisticsState,
  state => state.repositoryStatisticsLoadError
);

export const singleRepositoryStatisticsQuery = {
  getRepositoryStatistics,
  getRepositoryStatisticsLoading,
  getRepositoryStatisticsLoadError
};
