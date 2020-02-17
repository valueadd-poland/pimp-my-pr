import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, REVIEWERS_FEATURE_KEY, UserState } from './reviewers.reducer';

const getReviewersStatisticsState = createFeatureSelector<UserState>(REVIEWERS_FEATURE_KEY);

const getReviewersStatisticsCollectionEntityState = createSelector(
  getReviewersStatisticsState,
  state => state.reviewersStatisticsCollection
);

const getReviewersStatisticsCollection = createSelector(
  getReviewersStatisticsCollectionEntityState,
  selectAll
);

const getReviewersStatisticsCollectionLoading = createSelector(
  getReviewersStatisticsState,
  state => state.reviewersStatisticsCollectionLoading
);

const getReviewersStatisticsCollectionLoadError = createSelector(
  getReviewersStatisticsState,
  state => state.reviewersStatisticsCollectionLoadError
);

export const reviewersStatisticsQuery = {
  getReviewersStatisticsCollection: getReviewersStatisticsCollection,
  getReviewersStatisticsCollectionLoading: getReviewersStatisticsCollectionLoading,
  getReviewersStatisticsCollectionLoadError: getReviewersStatisticsCollectionLoadError
};
