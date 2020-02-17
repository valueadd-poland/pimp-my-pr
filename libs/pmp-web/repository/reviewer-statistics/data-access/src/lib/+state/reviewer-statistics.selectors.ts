import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  REVIEWERSTATISTICS_FEATURE_KEY,
  ReviewerStatisticsState
} from './reviewer-statistics.reducer';

// Lookup the 'ReviewerStatistics' feature state managed by NgRx
const getReviewerStatisticsState = createFeatureSelector<ReviewerStatisticsState>(
  REVIEWERSTATISTICS_FEATURE_KEY
);

const getReviewerStatisticsResponse = createSelector(
  getReviewerStatisticsState,
  state => state.reviewerStatisticsResponse
);

const getReviewerStatisticsResponseLoading = createSelector(
  getReviewerStatisticsState,
  state => state.reviewerStatisticsResponseLoading
);

const getReviewerStatisticsResponseLoadError = createSelector(
  getReviewerStatisticsState,
  state => state.reviewerStatisticsResponseLoadError
);

export const reviewerStatisticsQuery = {
  getReviewerStatisticsResponse: getReviewerStatisticsResponse,
  getReviewerStatisticsResponseLoading: getReviewerStatisticsResponseLoading,
  getReviewerStatisticsResponseLoadError: getReviewerStatisticsResponseLoadError
};
