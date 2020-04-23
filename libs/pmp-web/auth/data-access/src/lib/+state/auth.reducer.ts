import { fromAuthActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  authToken: string | null;
  loginInProgress: boolean;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  authToken: null,
  loginInProgress: false
};

export function authReducer(
  state: AuthState = initialState,
  action: fromAuthActions.CollectiveType
): AuthState {
  switch (action.type) {
    case fromAuthActions.Types.Login: {
      state = {
        ...state,
        loginInProgress: true
      };
      break;
    }

    case fromAuthActions.Types.LoginFail: {
      state = {
        ...state,
        loginInProgress: false
      };
      break;
    }

    case fromAuthActions.Types.ApplyToken:
    case fromAuthActions.Types.LoginSuccess: {
      state = {
        ...state,
        loginInProgress: false,
        authToken: action.payload.token
      };
      break;
    }

    case fromAuthActions.Types.Logout: {
      state = {
        ...state,
        authToken: null
      };
      break;
    }
  }

  return state;
}
