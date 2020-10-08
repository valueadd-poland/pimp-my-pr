import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PrRepoIndexStatistics, PrStatistics, RepositoryModel } from '@pimp-my-pr/shared/domain';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TableReviewerStatisticsPresenter } from './table-reviewer-statistics.presenter';

@Component({
  selector: 'pmp-table-reviewer-statistic',
  templateUrl: './table-reviewer-statistic.component.html',
  styleUrls: ['./table-reviewer-statistic.component.scss']
})
export class TableReviewerStatisticComponent implements OnInit {
  @Input()
  repositories: RepositoryModel[];
  @Input()
  columnPropertyName: string;
  @Input()
  isLoading = false;
  @Input()
  set tableData(data: PrRepoIndexStatistics[]) {
    this.dataSource = new MatTableDataSource<PrStatistics>(data);
    this.dataSource.sortingDataAccessor = (item, property) =>
      this.presenter.sortData(item, property);
    this.dataSource.sort = this.sort;
    if (data) {
      this.totalWaitingTime = data.reduce((a, b) => a + b.timeWaiting, 0);
      this.totalLinesOfCode = data.reduce((a, b) => a + b.linesOfCodeToCheck, 0);
    }
  }

  @Output()
  navigateItem = new EventEmitter<PrStatistics>();

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  dataSource: MatTableDataSource<PrStatistics>;
  displayedColumns: string[];
  totalWaitingTime = 0;
  totalLinesOfCode = 0;

  constructor(private presenter: TableReviewerStatisticsPresenter) {}

  ngOnInit(): void {
    this.displayedColumns = [
      'id',
      'repository',
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
