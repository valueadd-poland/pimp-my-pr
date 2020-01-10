import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, UserState } from './user.reducer';

const getUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

const getUserStatisticsCollection = createSelector(
  getUserState,
  state => state.userStatisticsCollection
);

const getUserStatisticsCollectionLoading = createSelector(
  getUserState,
  state => state.userStatisticsCollectionLoading
);

const getUserStatisticsCollectionLoadError = createSelector(
  getUserState,
  state => state.userStatisticsCollectionLoadError
);

export const userQuery = {
  getUserStatisticsCollection,
  getUserStatisticsCollectionLoading,
  getUserStatisticsCollectionLoadError
};
