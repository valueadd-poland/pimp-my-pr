import { Injectable } from '@angular/core';
import { TimelineRecord, TimelineTotalStats } from '@pimp-my-pr/pmp-web/repository/domain';
import {
  TimelineChartNumberCardDataType,
  TimelineComboChartDataType
} from './timeline-chart-data.type';

@Injectable()
export class TimelineChartPresenter {
  getTimelineChartData(records: TimelineRecord[]): TimelineComboChartDataType {
    return [
      {
        name: 'Avg PRs count',
        series: records.map(record => ({
          name: record.dataFrom,
          value: record.avgCount
        }))
      },
      {
        name: 'Avg waiting [days]',
        secondAxis: true,
        series: records.map(record => ({
          name: record.dataFrom,
          value: Math.round(record.avgWaitingTime / 1000 / 3600 / 24)
        }))
      },
      {
        name: 'Total PRs',
        series: records.map(record => ({
          name: record.dataFrom,
          value: record.sumCount
        }))
      }
    ];
  }

  getTotalStats(stats: TimelineTotalStats): TimelineChartNumberCardDataType {
    return [
      {
        name: 'Total PRs',
        value: stats.totalPrs
      },
      {
        name: 'Avg open PRs',
        value: stats.avgPrsCount
      },
      {
        name: 'Avg waiting [days]',
        value: Math.round(stats.avgWaitingTime / 1000 / 3600 / 24)
      },
      {
        name: 'Opened',
        value: stats.opened
      },
      {
        name: 'Closed',
        value: stats.closed
      }
    ];
  }
}
