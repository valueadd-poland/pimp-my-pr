import { initialState, USER_FEATURE_KEY, UserState } from './user.reducer';
import { userQuery } from './user.selectors';

describe('User Selectors', () => {
  let storeState: { [USER_FEATURE_KEY]: UserState };

  beforeEach(() => {
    storeState = {
      [USER_FEATURE_KEY]: initialState
    };
  });

  it('getUserStatisticsCollection() should return userStatisticsCollection value', () => {
    const result = userQuery.getUserStatisticsCollection(storeState);

    expect(result).toBe(storeState[USER_FEATURE_KEY].userStatisticsCollection);
  });

  it('getUserStatisticsCollectionLoading() should return userStatisticsCollectionLoading value', () => {
    const result = userQuery.getUserStatisticsCollectionLoading(storeState);

    expect(result).toBe(storeState[USER_FEATURE_KEY].userStatisticsCollectionLoading);
  });

  it('getUserStatisticsCollectionLoadError() should return userStatisticsCollectionLoadError value', () => {
    const result = userQuery.getUserStatisticsCollectionLoadError(storeState);

    expect(result).toBe(storeState[USER_FEATURE_KEY].userStatisticsCollectionLoadError);
  });
});
