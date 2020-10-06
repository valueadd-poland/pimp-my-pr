import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  HostListener,
  OnChanges,
  ContentChild,
  TemplateRef
} from '@angular/core';
import {
  BaseChartComponent,
  calculateViewDimensions,
  ViewDimensions,
  ColorHelper
} from '@swimlane/ngx-charts';
import { curveLinear } from 'd3-shape';
import { scaleLinear, scalePoint, scaleTime } from 'd3-scale';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'pmp-web-double-axis-chart',
  templateUrl: './double-axis-chart.component.html',
  styleUrls: ['./double-axis-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DoubleAxisChartComponent extends BaseChartComponent implements OnChanges {
  @Input() legend: boolean;
  @Input() legendTitle = 'Legend';
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel: boolean;
  @Input() yMainAxisShowLabel: boolean;
  @Input() ySecondaryAxisShowLabel: boolean;
  @Input() xAxisLabel: string;
  @Input() yMainAxisLabel: string;
  @Input() ySecondaryAxisLabel: string;
  @Input() autoScale = true;
  @Input() timeline = true;
  @Input() gradient: boolean;
  @Input() showXGridLines = true;
  @Input() showYMainGridLines = true;
  @Input() showYSecondaryGridLines = false;
  @Input() curve: any = curveLinear;
  @Input() activeEntries: any[] = [];
  @Input() schemeType: string;
  @Input() rangeFillOpacity: number;
  @Input() xAxisTickFormatting: any;
  @Input() yMainAxisTickFormatting: any;
  @Input() ySecondaryAxisTickFormatting: any;
  @Input() xAxisTicks: any[];
  @Input() yMainAxisTicks: any[];
  @Input() ySecondaryAxisTicks: any[];
  @Input() roundDomains = false;
  @Input() tooltipDisabled = false;
  @Input() showRefLines = false;
  @Input() referenceLines: any;
  @Input() showRefLabels = true;
  @Input() xScaleMin: any;
  @Input() xScaleMax: any;
  @Input() yMainScaleMin: number;
  @Input() yMainScaleMax: number;
  @Input() ySecondaryScaleMin: number;
  @Input() ySecondaryScaleMax: number;
  @Input() yDefaultAxis = 'left';
  // tslint:disable-next-line:no-input-rename
  @Input('results') chartsData: any; // parent class clear custom properties "secondAxis"
  @Input() yMainAxisScaleFactor: any;
  @Input() ySecondaryAxisScaleFactor: any;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();
  @Output() rangeChanged: EventEmitter<[Date, Date]> = new EventEmitter<[Date, Date]>();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;
  @ContentChild('seriesTooltipTemplate') seriesTooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  xScale: any;
  yMainScale: any;
  xDomain: any;
  yDomain: any;
  transform: string;
  colors: ColorHelper;
  colorsLine: ColorHelper;
  margin: any[] = [10, 20, 10, 20];
  xAxisHeight = 0;
  yAxisWidth = 0;
  legendOptions: any;
  scaleType = 'linear';
  xScaleLine;
  yScaleLine;
  ySecondScale;
  yDomainLine;
  yDomainLine1;
  seriesDomain;
  scaledAxis;
  combinedSeries;
  xSet;
  filteredDomain;
  hoveredVertical;
  yOrientLeft = 'left';
  yOrientRight = 'right';
  legendSpacing = 0;
  bandwidth;
  barPadding = 10;
  lineChart;
  lineChart1;
  clipPathId;
  clipPath;

  /* timeline */
  timelineWidth;
  timelineXDomain;
  timelineXScale;
  timelineYScale;
  timelineTransform;
  timelineHeight = 50;
  timelinePadding = 10;
  /* timeline */

  comboArr: any[] = [];

  dataSplit(): void {
    [this.lineChart, this.lineChart1] = this.chartsData.reduce(
      (acc, item) => {
        if (item.secondAxis) {
          acc[1].push(item);
        } else {
          acc[0].push(item);
        }

        return acc;
      },
      [[], []]
    );

    if (this.lineChart1.length) {
      const [min1, max1] = this.getYDomainLine(this.lineChart);
      const [min2, max2] = this.getYDomainLine(this.lineChart1);

      this.comboArr = this.lineChart.concat(
        this.lineChart1.map(line => {
          return {
            name: line.name,
            series: line.series.map(point => {
              return {
                name: point.name,
                value: ((point.value - min2) * (max1 - min1)) / (max2 - min2) + min1
              };
            })
          };
        })
      );
    } else {
      this.comboArr = this.lineChart;
    }
  }

  trackBy(index, item): string {
    return item.name;
  }

  update(): void {
    this.dataSplit();

    super.update();

    const q = {
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: this.xAxis,
      showYAxis: this.yAxis,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
      showXLabel: this.showXAxisLabel,
      showYLabel: this.yMainAxisShowLabel,
      showLegend: this.legend,
      legendType: this.schemeType
    };

    this.dims = calculateViewDimensions(q);

    if (this.yAxis && this.lineChart1.length) {
      this.dims.width -= 65;
    }

    if (this.timeline) {
      this.dims.height -= this.timelineHeight + this.margin[2] + this.timelinePadding;
    }

    if (!this.yAxis) {
      this.legendSpacing = 0;
    } else if (this.yMainAxisShowLabel && this.yAxis) {
      this.legendSpacing = 100;
    } else {
      this.legendSpacing = 40;
    }

    // line chart
    if (!this.xDomain && !this.xScaleLine) {
      this.xDomain = this.getXDomainLine();
      this.xScaleLine = this.getXScale(this.xDomain, this.dims.width);
    }
    this.seriesDomain = this.getSeriesDomain();
    this.yDomainLine = this.getYDomainLine(this.lineChart);
    this.yMainScale = this.getYScaleLine(this.yDomainLine, this.dims.height);

    if (this.lineChart1.length) {
      this.yDomainLine1 = this.getYDomainLine(this.lineChart1);
      this.ySecondScale = this.getYScaleLine(this.yDomainLine1, this.dims.height);
    }

    this.updateTimeline();
    this.setColors();
    this.legendOptions = this.getLegendOptions();
    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    this.clipPathId = 'clip' + id().toString();
    this.clipPath = `url(#${this.clipPathId})`;
  }

  deactivateAll(): void {
    this.activeEntries = [...this.activeEntries];
    for (const entry of this.activeEntries) {
      this.deactivate.emit({ value: entry, entries: [] });
    }
    this.activeEntries = [];
  }

  @HostListener('mouseleave')
  hideCircles(): void {
    this.hoveredVertical = null;
    this.deactivateAll();
  }

  updateHoveredVertical(item): void {
    this.hoveredVertical = item.value;
    this.deactivateAll();
  }

  updateDomain(domain): void {
    this.deactivateAll();
    this.rangeChanged.emit(domain);
    this.filteredDomain = domain;
    this.xDomain = this.filteredDomain;
    this.xScaleLine = this.getXScale(this.xDomain, this.dims.width);
  }

  getSeriesDomain(): any[] {
    this.combinedSeries = this.lineChart.concat(this.lineChart1);

    return this.combinedSeries.map(d => d.name);
  }

  isDate(value): boolean {
    return value instanceof Date;
  }

  getScaleType(values): string {
    let date = true;
    let num = true;

    for (const value of values) {
      if (!this.isDate(value)) {
        date = false;
      }

      if (typeof value !== 'number') {
        num = false;
      }
    }

    if (date) {
      return 'time';
    }
    if (num) {
      return 'linear';
    }

    return 'ordinal';
  }

  getXDomainLine(): any[] {
    let values = [];

    for (const results of this.lineChart) {
      for (const d of results.series) {
        if (!values.includes(d.name)) {
          values.push(d.name);
        }
      }
    }

    this.scaleType = this.getScaleType(values);
    let domain = [];

    if (this.scaleType === 'time') {
      const min = Math.min(...values);
      const max = Math.max(...values);
      domain = [min, max];
    } else if (this.scaleType === 'linear') {
      values = values.map(v => Number(v));
      const min = Math.min(...values);
      const max = Math.max(...values);
      domain = [min, max];
    } else {
      domain = values;
    }

    this.xSet = values;

    return domain;
  }

  getYDomainLine(data): any[] {
    const domain = [];

    for (const results of data) {
      for (const d of results.series) {
        if (domain.indexOf(d.value) < 0) {
          domain.push(d.value);
        }
        if (d.min !== undefined) {
          if (domain.indexOf(d.min) < 0) {
            domain.push(d.min);
          }
        }
        if (d.max !== undefined) {
          if (domain.indexOf(d.max) < 0) {
            domain.push(d.max);
          }
        }
      }
    }

    if (!this.autoScale) {
      domain.push(0);
    }

    const min = this.yMainScaleMin ? this.yMainScaleMin : Math.min(...domain);
    const max = this.yMainScaleMax ? this.yMainScaleMax : Math.max(...domain);

    if (this.ySecondaryAxisScaleFactor) {
      const minMax = this.ySecondaryAxisScaleFactor(min, max);

      return [minMax.min, minMax.max];
    } else {
      return [min, max];
    }
  }

  getXScale(domain, width): any {
    let scale;
    if (this.bandwidth === undefined) {
      this.bandwidth = this.dims.width - this.barPadding;
    }

    if (this.scaleType === 'time') {
      scale = scaleTime()
        .range([0, width])
        .domain(domain);
    } else if (this.scaleType === 'linear') {
      scale = scaleLinear()
        .range([0, width])
        .domain(domain);

      if (this.roundDomains) {
        scale = scale.nice();
      }
    } else if (this.scaleType === 'ordinal') {
      scale = scalePoint()
        .range([this.bandwidth / 2, width - this.bandwidth / 2])
        .domain(domain);
    }

    return scale;
  }

  getYScaleLine(domain, height): any {
    const scale = scaleLinear()
      .range([height, 0])
      .domain(domain);

    return this.roundDomains ? scale.nice() : scale;
  }

  getYScale(yDomain, height): any {
    const scale = scaleLinear()
      .range([height, 0])
      .domain(yDomain);

    return this.roundDomains ? scale.nice() : scale;
  }

  onClick(data): void {
    this.select.emit(data);
  }

  setColors(): void {
    let domain;
    if (this.schemeType === 'ordinal') {
      domain = this.xDomain;
    } else {
      domain = this.yDomain;
    }
    this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    this.colorsLine = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
  }

  getLegendOptions(): { scaleType: string; colors: any; domain: any[]; title: any } {
    const opts = {
      scaleType: this.schemeType,
      colors: undefined,
      domain: [],
      title: undefined
    };
    if (opts.scaleType === 'ordinal') {
      opts.domain = this.seriesDomain;
      opts.colors = this.colorsLine;
      opts.title = this.legendTitle;
    } else {
      opts.domain = this.seriesDomain;
      opts.colors = this.colors.scale;
    }

    return opts;
  }

  updateLineWidth(width): void {
    this.bandwidth = width;
  }

  updateYAxisWidth({ width }): void {
    this.yAxisWidth = width + 20;
    this.update();
  }

  updateXAxisHeight({ height }): void {
    this.xAxisHeight = height;
    this.update();
  }

  onActivate(item): void {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });
    if (idx > -1) {
      return;
    }

    this.activeEntries = [item, ...this.activeEntries];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(item): void {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }

  updateTimeline(): void {
    if (this.timeline) {
      this.timelineWidth = this.dims.width;
      this.timelineXDomain = this.getXDomainLine();
      this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
      const timeLineDomain = this.getYDomainLine(this.comboArr);
      this.timelineYScale = this.getYScale(timeLineDomain, this.timelineHeight);
      this.timelineTransform = `translate(${this.dims.xOffset}, ${-this.margin[2]})`;
    }
  }
}
