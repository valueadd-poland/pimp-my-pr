import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  TimelineChartRange,
  TimelineRecord,
  TimelineTotalStats
} from '@pimp-my-pr/pmp-web/repository/domain';
import { TimelineChartPresenter } from './timeline-chart.presenter';
import {
  TimelineChartLegendDataType,
  TimelineChartNumberCardDataType,
  TimelineComboChartDataType
} from './timeline-chart-data.type';
import { ColorHelper } from '@swimlane/ngx-charts';
import { TimelineChartItem } from './timeline-chart-item.interface';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'pmp-web-timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.scss'],
  providers: [TimelineChartPresenter]
})
export class TimelineChartComponent {
  @Input() set timelineRecords(data: TimelineRecord[]) {
    this.timelineChartData = this.service.getTimelineChartData(data);
    this.legendData = this.timelineChartData.map(el => el.name).slice(0, 3);
    this.legendColors = new ColorHelper(
      this.axisColorSchema,
      'ordinal',
      this.legendData,
      this.axisColorSchema
    );
  }
  @Input() set timelineTotalStats(data: TimelineTotalStats) {
    this.totalStatsChartData = this.service.getTotalStats(data);
  }
  @Output() timelineRangeChanged: EventEmitter<TimelineChartRange> = new EventEmitter<
    TimelineChartRange
  >();

  constructor(private service: TimelineChartPresenter) {
    this.rangeChangedSubject
      .pipe(debounceTime(200))
      .subscribe(el => this.timelineRangeChanged.emit(el));
  }

  colorSchema = {
    domain: ['#4f86c3', '#c41d3e', '#100c5f', '#6b5b5b', '#289828']
  };
  axisColorSchema = {
    domain: ['#4f86c3', '#c41d3e', '#100c5f']
  };
  rangeChangedSubject: BehaviorSubject<TimelineChartRange> = new BehaviorSubject<
    TimelineChartRange
  >({ toDate: null, fromDate: null });
  timelineChartData: TimelineComboChartDataType;
  totalStatsChartData: TimelineChartNumberCardDataType;
  legendData: TimelineChartLegendDataType;
  activeEntries: TimelineChartItem[] = [];
  legendColors: ColorHelper;

  activateItem(item: TimelineChartItem): void {
    if (item.value === undefined) {
      this.activeEntries = [item];
    } else {
      this.activeEntries = [{ name: item.value.name }];
    }
  }

  deactivateAll(): void {
    this.activeEntries = [];
  }

  changeTimelineRange(event: [Date, Date]): void {
    this.rangeChangedSubject.next({
      fromDate: event[0],
      toDate: event[1]
    });
  }
}
