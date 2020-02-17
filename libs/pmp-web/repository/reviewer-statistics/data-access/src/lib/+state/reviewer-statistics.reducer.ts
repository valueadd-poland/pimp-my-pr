import { fromReviewerStatisticsActions } from './reviewer-statistics.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ReviewerStatisticsResponse } from '@pimp-my-pr/shared/domain';

export const REVIEWERSTATISTICS_FEATURE_KEY = 'ReviewerStatisticsStatistics';

export interface ReviewerStatisticsState {
  reviewerStatisticsResponse: ReviewerStatisticsResponse | null;
  reviewerStatisticsResponseLoading: boolean;
  reviewerStatisticsResponseLoadError: HttpErrorResponse | null;
}

export interface ReviewerStatisticsPartialState {
  readonly [REVIEWERSTATISTICS_FEATURE_KEY]: ReviewerStatisticsState;
}

export const initialState: ReviewerStatisticsState = {
  reviewerStatisticsResponse: null,
  reviewerStatisticsResponseLoading: false,
  reviewerStatisticsResponseLoadError: null
};

export function reviewerStatisticsReducer(
  state: ReviewerStatisticsState = initialState,
  action: fromReviewerStatisticsActions.CollectiveType
): ReviewerStatisticsState {
  switch (action.type) {
    case fromReviewerStatisticsActions.Types.GetReviewerStatisticsResponse: {
      state = {
        ...state,
        reviewerStatisticsResponse: null,
        reviewerStatisticsResponseLoading: true,
        reviewerStatisticsResponseLoadError: null
      };
      break;
    }

    case fromReviewerStatisticsActions.Types.GetReviewerStatisticsResponseFail: {
      state = {
        ...state,
        reviewerStatisticsResponse: null,
        reviewerStatisticsResponseLoading: false,
        reviewerStatisticsResponseLoadError: action.payload
      };
      break;
    }

    case fromReviewerStatisticsActions.Types.GetReviewerStatisticsResponseSuccess: {
      state = {
        ...state,
        reviewerStatisticsResponse: action.payload,
        reviewerStatisticsResponseLoading: false,
        reviewerStatisticsResponseLoadError: null
      };
      break;
    }
  }

  return state;
}
