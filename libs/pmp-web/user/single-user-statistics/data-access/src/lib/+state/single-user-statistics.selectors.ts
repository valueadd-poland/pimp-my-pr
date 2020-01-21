import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SINGLEUSERSTATISTICS_FEATURE_KEY,
  SingleUserStatisticsState
} from './single-user-statistics.reducer';

// Lookup the 'SingleUserStatistics' feature state managed by NgRx
const getSingleUserStatisticsState = createFeatureSelector<SingleUserStatisticsState>(
  SINGLEUSERSTATISTICS_FEATURE_KEY
);

const getSingleUserStatisticsResponse = createSelector(
  getSingleUserStatisticsState,
  state => state.singleUserStatisticsResponse
);

const getSingleUserStatisticsResponseLoading = createSelector(
  getSingleUserStatisticsState,
  state => state.singleUserStatisticsResponseLoading
);

const getSingleUserStatisticsResponseLoadError = createSelector(
  getSingleUserStatisticsState,
  state => state.singleUserStatisticsResponseLoadError
);

export const singleUserStatisticsQuery = {
  getSingleUserStatisticsResponse,
  getSingleUserStatisticsResponseLoading,
  getSingleUserStatisticsResponseLoadError
};
