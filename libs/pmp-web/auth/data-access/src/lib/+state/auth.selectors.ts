import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

const getAuthToken = createSelector(
  getAuthState,
  state => state.authToken
);

const getLoginInProgress = createSelector(
  getAuthState,
  state => state.loginInProgress
);

export const authQuery = {
  getAuthToken,
  getLoginInProgress
};
