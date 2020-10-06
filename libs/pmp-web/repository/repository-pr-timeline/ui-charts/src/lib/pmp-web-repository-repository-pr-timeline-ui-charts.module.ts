import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineChartComponent } from './timeline-chart/timeline-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DoubleAxisChartComponent } from './double-axis-chart/double-axis-chart.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, NgxChartsModule, MatIconModule],
  declarations: [TimelineChartComponent, DoubleAxisChartComponent],
  exports: [TimelineChartComponent]
})
export class PmpWebRepositoryRepositoryPrTimelineUiChartsModule {}
