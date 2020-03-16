import { HttpErrorResponse } from '@angular/common/http';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserStatistics } from '@pimp-my-pr/shared/domain';
import { fromUserActions } from './reviewers.actions';

export const REVIEWERS_FEATURE_KEY = 'reviewers';

export interface ReviewersStatisticsEntityState extends EntityState<UserStatistics> {}
export interface ReviewersStatisticsPartialState {
  readonly [REVIEWERS_FEATURE_KEY]: UserState;
}

export const adapter: EntityAdapter<UserStatistics> = createEntityAdapter<UserStatistics>();

export interface UserState {
  reviewersStatisticsCollection: ReviewersStatisticsEntityState;
  reviewersStatisticsCollectionLoading: boolean;
  reviewersStatisticsCollectionLoadError: HttpErrorResponse | null;
}

export const initialState: UserState = {
  reviewersStatisticsCollection: adapter.getInitialState(),
  reviewersStatisticsCollectionLoading: false,
  reviewersStatisticsCollectionLoadError: null
};

export function reviewersReducer(
  state: UserState = initialState,
  action: fromUserActions.CollectiveType
): UserState {
  switch (action.type) {
    case fromUserActions.Types.GetReviewersStatisticsCollection: {
      state = {
        ...state,
        reviewersStatisticsCollection: adapter.getInitialState(),
        reviewersStatisticsCollectionLoading: true,
        reviewersStatisticsCollectionLoadError: null
      };
      break;
    }

    case fromUserActions.Types.GetReviewersStatisticsCollectionFail: {
      state = {
        ...state,
        reviewersStatisticsCollection: adapter.getInitialState(),
        reviewersStatisticsCollectionLoading: false,
        reviewersStatisticsCollectionLoadError: action.payload
      };
      break;
    }

    case fromUserActions.Types.GetReviewersStatisticsCollectionSuccess: {
      state = {
        ...state,
        reviewersStatisticsCollection: adapter.addAll(
          action.payload,
          state.reviewersStatisticsCollection
        ),
        reviewersStatisticsCollectionLoading: false,
        reviewersStatisticsCollectionLoadError: null
      };
      break;
    }
  }

  return state;
}

export const { selectAll } = adapter.getSelectors();
