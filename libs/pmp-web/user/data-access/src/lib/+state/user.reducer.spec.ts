import { fromUserActions } from './user.actions';
import { UserState, initialState, userReducer } from './user.reducer';
import { statesEqual } from '@valueadd/testing';

describe('User Reducer', () => {
  let state: UserState;

  beforeEach(() => {
    state = { ...initialState };
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = userReducer(state, action);

      expect(result).toBe(state);
    });
  });

  describe('GetUserStatisticsCollection', () => {
    it('should set userStatisticsCollection, userStatisticsCollectionLoading, userStatisticsCollectionLoadError and do not modify other state properties', () => {
      const payload = {} as any;
      const action = new fromUserActions.GetUserStatisticsCollection(payload);
      const result = userReducer(state, action);

      expect(result.userStatisticsCollection).toEqual([]);
      expect(result.userStatisticsCollectionLoading).toEqual(true);
      expect(result.userStatisticsCollectionLoadError).toEqual(null);
      expect(
        statesEqual(result, state, [
          'userStatisticsCollection',
          'userStatisticsCollectionLoading',
          'userStatisticsCollectionLoadError'
        ])
      ).toBeTruthy();
    });
  });

  describe('GetUserStatisticsCollectionFail', () => {
    it('should set userStatisticsCollection, userStatisticsCollectionLoading, userStatisticsCollectionLoadError and do not modify other state properties', () => {
      const payload = {} as any;
      const action = new fromUserActions.GetUserStatisticsCollectionFail(payload);
      const result = userReducer(state, action);

      expect(result.userStatisticsCollection).toEqual([]);
      expect(result.userStatisticsCollectionLoading).toEqual(false);
      expect(result.userStatisticsCollectionLoadError).toEqual(payload);
      expect(
        statesEqual(result, state, [
          'userStatisticsCollection',
          'userStatisticsCollectionLoading',
          'userStatisticsCollectionLoadError'
        ])
      ).toBeTruthy();
    });
  });

  describe('GetUserStatisticsCollectionSuccess', () => {
    it('should set userStatisticsCollection, userStatisticsCollectionLoading, userStatisticsCollectionLoadError and do not modify other state properties', () => {
      const payload = {} as any;
      const action = new fromUserActions.GetUserStatisticsCollectionSuccess(payload);
      const result = userReducer(state, action);

      expect(result.userStatisticsCollection).toEqual(payload);
      expect(result.userStatisticsCollectionLoading).toEqual(false);
      expect(result.userStatisticsCollectionLoadError).toEqual(null);
      expect(
        statesEqual(result, state, [
          'userStatisticsCollection',
          'userStatisticsCollectionLoading',
          'userStatisticsCollectionLoadError'
        ])
      ).toBeTruthy();
    });
  });
});
