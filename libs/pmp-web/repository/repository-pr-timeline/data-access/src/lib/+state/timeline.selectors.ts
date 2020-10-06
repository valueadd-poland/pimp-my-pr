import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TIMELINE_FEATURE_KEY, TimelineState } from './timeline.reducer';
import {
  Timeline,
  TimelineChartRange,
  TimelineTotalStats
} from '@pimp-my-pr/pmp-web/repository/domain';

// Lookup the 'Timeline' feature state managed by NgRx
const getTimelineState = createFeatureSelector<TimelineState>(TIMELINE_FEATURE_KEY);

const getLoading = createSelector(getTimelineState, state => state.timelineLoading);

const getError = createSelector(getTimelineState, state => state.timelineError);

const getTimelineRecords = createSelector(getTimelineState, state => state.timelineRecords);

const getTimelineProperties = createSelector(getTimelineState, state => state.timelineProperties);

const getTimelineRecordsInRange = createSelector(
  getTimelineRecords,
  (records, { fromDate, toDate }: TimelineChartRange) => {
    return records.filter(
      record =>
        (!fromDate || record.dataFrom.getTime() >= fromDate.getTime()) &&
        (!toDate || record.dataFrom.getTime() <= toDate.getTime())
    );
  }
);

const getTotalPrsCount = createSelector(
  getTimelineRecordsInRange,
  getTimelineProperties,
  (filteredRecords, properties) => {
    if (filteredRecords.length < 1) return 0;
    const first = filteredRecords[0];
    const last = filteredRecords[filteredRecords.length - 1];
    return properties.totalPrs - last.closedBefore - first.openedAfter;
  }
);

const getAvgCount = createSelector(
  getTimelineRecordsInRange,
  filteredRecords =>
    filteredRecords.reduce((total, current) => total + current.avgCount, 0) /
      filteredRecords.length || 0
);

const getAvgWaitingTime = createSelector(
  getTimelineRecordsInRange,
  filteredRecords =>
    filteredRecords.reduce((total, current) => total + current.avgWaitingTime, 0) /
      filteredRecords.length || 0
);

const getClosed = createSelector(getTimelineRecordsInRange, filteredRecords => {
  if (filteredRecords.length < 1) return filteredRecords[0].closedBefore;
  const first = filteredRecords[0];
  const last = filteredRecords[filteredRecords.length - 1];
  return first.closedBefore - last.closedBefore;
});

const getOpened = createSelector(getTimelineRecordsInRange, filteredRecords => {
  if (filteredRecords.length < 1) return filteredRecords[0].openedAfter;
  const first = filteredRecords[0];
  const last = filteredRecords[filteredRecords.length - 1];
  return last.openedAfter - first.openedAfter;
});

const getTimelineTotalStats = createSelector(
  getTotalPrsCount,
  getAvgWaitingTime,
  getAvgCount,
  getClosed,
  getOpened,
  (totalPrs, avgWaitingTime, avgPrsCount, closed, opened): TimelineTotalStats => ({
    totalPrs,
    avgPrsCount,
    avgWaitingTime,
    closed,
    opened
  })
);

export const timelineQuery = {
  getError,
  getLoading,
  getTimelineProperties,
  getAvgWaitingTime,
  getTimelineRecords,
  getTotalPrsCount,
  getAvgCount,
  getClosed,
  getOpened,
  getTimelineRecordsInRange,
  getTimelineState,
  getTimelineTotalStats
};
