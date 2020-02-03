import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PrStatistics } from '@pimp-my-pr/shared/domain';
import { MatSort, MatTableDataSource } from '@angular/material';
import { TablePrStatisticsPresenter } from './table-pr-statistics.presenter';

@Component({
  selector: 'pmp-table-pr-statistic',
  templateUrl: './table-pr-statistic.component.html',
  styleUrls: ['./table-pr-statistic.component.scss'],
  providers: [TablePrStatisticsPresenter]
})
export class TablePrStatisticComponent implements OnInit {
  @Input()
  set tableData(data: PrStatistics[]) {
    this.dataSource = new MatTableDataSource<PrStatistics>(data);
    this.dataSource.sortingDataAccessor = (item, property) =>
      this.presenter.sortData(item, property);
    this.dataSource.sort = this.sort;
  }

  @Input()
  columnPropertyName: string;

  @Output()
  navigateItem = new EventEmitter<PrStatistics>();

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  dataSource: MatTableDataSource<PrStatistics>;

  displayedColumns: string[];

  constructor(private presenter: TablePrStatisticsPresenter) {}

  ngOnInit(): void {
    this.displayedColumns = [
      'id',
      'title',
      'waitingTime',
      'linesToCheck',
      'author',
      this.columnPropertyName,
      'link'
    ];
  }

  onNavigateToItem(item: PrStatistics): void {
    this.navigateItem.emit(item);
  }
}
