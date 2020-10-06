import { TimelineChartSeries } from './timeline-chart-series.interface';

export interface TimelineChartChunk {
  name: string;
  series: TimelineChartSeries[];
  secondAxis?: boolean;
}
