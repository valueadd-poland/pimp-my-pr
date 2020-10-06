import { fromTimelineActions } from './timeline.actions';
import { TimelineState, initialState, timelineReducer } from './timeline.reducer';
import { statesEqual } from '@valueadd/testing';
import { Timeline } from '@pimp-my-pr/pmp-web/repository/domain';

describe('Timeline Reducer', () => {
  let state: TimelineState;

  beforeEach(() => {
    state = { ...initialState };
  });

  describe('unknown action', () => {
    test('returns the initial state', () => {
      const action = {} as any;
      const result = timelineReducer(state, action);

      expect(result).toBe(state);
    });
  });

  describe('GetTimeline', () => {
    test('sets timelineProperties, timelineRecords, timelineLoading, timelineError and does not modify other state properties', () => {
      const payload = {} as any;
      const action = new fromTimelineActions.GetTimeline(payload);
      const result = timelineReducer(state, action);

      expect(result.timelineRecords).toEqual([]);
      expect(result.timelineLoading).toEqual(true);
      expect(result.timelineError).toEqual(null);
      expect(result.timelineProperties).toEqual(null);
      expect(
        statesEqual(result, state, [
          'timelineProperties',
          'timelineRecords',
          'timelineLoading',
          'timelineError'
        ])
      ).toBeTruthy();
    });
  });

  describe('GetTimelineFail', () => {
    test('sets timelineLoading, timelineError and does not modify other state properties', () => {
      const payload = {} as any;
      const action = new fromTimelineActions.GetTimelineFail(payload);
      const result = timelineReducer(state, action);

      expect(result.timelineLoading).toEqual(false);
      expect(result.timelineError).toEqual(payload);
      expect(statesEqual(result, state, ['timelineLoading', 'timelineError'])).toBeTruthy();
    });
  });

  describe('GetTimelineSuccess', () => {
    test('sets timelineProperties, timelineRecords, timelineLoading, timelineError and does not modify other state properties', () => {
      const payload = { data: [] } as Timeline;
      const action = new fromTimelineActions.GetTimelineSuccess(payload);
      const result = timelineReducer(state, action);
      const { data, ...rest } = payload;
      expect(result.timelineRecords).toEqual(payload.data);
      expect(result.timelineProperties).toEqual(rest);
      expect(result.timelineLoading).toEqual(false);
      expect(result.timelineError).toEqual(null);
      expect(
        statesEqual(result, state, [
          'timelineRecords',
          'timelineProperties',
          'timelineLoading',
          'timelineError'
        ])
      ).toBeTruthy();
    });
  });
});
