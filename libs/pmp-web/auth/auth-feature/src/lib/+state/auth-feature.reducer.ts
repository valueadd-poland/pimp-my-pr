import { fromAuthFeatureActions } from './auth-feature.actions';

export const AUTH_FEATURE_FEATURE_KEY = 'authFeature';

// tslint:disable-next-line:no-empty-interface
export interface AuthFeatureState {}

export interface AuthFeaturePartialState {
  readonly [AUTH_FEATURE_FEATURE_KEY]: AuthFeatureState;
}

export const initialState: AuthFeatureState = {};

export function authFeatureReducer(
  state: AuthFeatureState = initialState,
  action: fromAuthFeatureActions.CollectiveType
): AuthFeatureState {
  return state;
}
