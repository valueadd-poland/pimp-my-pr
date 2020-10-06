import { TimelineRecord } from '@pimp-my-pr/pmp-web/repository/domain';
import { timelineQuery } from '@pimp-my-pr/pmp-web/repository/repository-pr-timeline/data-access';

describe('Timeline selectors', () => {
  const state = {
    totalPrs: 30,
    timelineRecords: [
      {
        dataFrom: new Date(2020, 6, 10),
        sumCount: 10,
        avgCount: 5,
        avgWaitingTime: 12,
        closedBefore: 20,
        openedAfter: 0
      },
      {
        dataFrom: new Date(2020, 6, 9),
        sumCount: 12,
        avgCount: 5,
        avgWaitingTime: 12,
        closedBefore: 18,
        openedAfter: 2
      },
      {
        dataFrom: new Date(2020, 6, 8),
        sumCount: 10,
        avgCount: 5,
        avgWaitingTime: 12,
        closedBefore: 20,
        openedAfter: 0
      },
      {
        dataFrom: new Date(2020, 6, 7),
        sumCount: 10,
        avgCount: 5,
        avgWaitingTime: 12,
        closedBefore: 20,
        openedAfter: 0
      },
      {
        dataFrom: new Date(2020, 6, 6),
        sumCount: 10,
        avgCount: 5,
        avgWaitingTime: 12,
        closedBefore: 20,
        openedAfter: 0
      },
      {
        dataFrom: new Date(2020, 6, 5),
        sumCount: 10,
        avgCount: 5,
        avgWaitingTime: 12,
        closedBefore: 20,
        openedAfter: 0
      }
    ]
  };

  describe('getTimelineRecordsInRange', () => {
    it('should return correct value', () => {
      expect(
        timelineQuery.getTimelineRecordsInRange.projector(state.timelineRecords, {
          fromDate: new Date(2020, 6, 7),
          toDate: new Date(2020, 6, 9)
        }).length
      ).toBe(3);
    });
  });

  describe('getTotalPrsCount', () => {
    it('should return correct value', () => {
      expect(timelineQuery.getTotalPrsCount.projector(state.timelineRecords, state)).toBe(10);
    });
  });

  describe('getClosed', () => {
    it('should return correct value', () => {
      expect(timelineQuery.getClosed.projector(state.timelineRecords)).toBe(0);
    });
  });

  describe('getOpened', () => {
    it('should return correct value', () => {
      expect(timelineQuery.getOpened.projector(state.timelineRecords)).toBe(0);
    });
  });

  describe('getAvgCount', () => {
    it('should return correct value', () => {
      expect(timelineQuery.getAvgCount.projector(state.timelineRecords)).toBe(5);
    });
  });

  describe('getAvgWaitingTime', () => {
    it('should return correct value', () => {
      expect(timelineQuery.getAvgWaitingTime.projector(state.timelineRecords)).toBe(12);
    });
  });
});
