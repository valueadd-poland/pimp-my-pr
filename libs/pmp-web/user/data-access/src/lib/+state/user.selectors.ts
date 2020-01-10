import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, UserState, selectAll } from './user.reducer';

const getUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

const getUserStatisticsCollectionEntityState = createSelector(
  getUserState,
  state => state.userStatisticsCollection
);

const getUserStatisticsCollection = createSelector(
  getUserStatisticsCollectionEntityState,
  selectAll
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
