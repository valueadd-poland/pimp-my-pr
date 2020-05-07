import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { PrStatistics } from '@pimp-my-pr/shared/domain';
import { TablePrStatisticsPresenter } from './table-pr-statistics.presenter';

@Component({
  selector: 'pmp-table-pr-statistic',
  templateUrl: './table-pr-statistic.component.html',
  styleUrls: ['./table-pr-statistic.component.scss'],
  providers: [TablePrStatisticsPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePrStatisticComponent implements OnInit {
  @Input()
  columnPropertyName: string;
  @Input()
  isLoading = false;
  @Input()
  set tableData(data: PrStatistics[]) {
    this.dataSource = new MatTableDataSource<PrStatistics>(data);
    this.dataSource.sortingDataAccessor = (item, property) =>
      this.presenter.sortData(item, property);
    this.dataSource.sort = this.sort;
  }

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
      'timeWaitingFromLastChange',
      'linesToCheck',
      'comments',
      'author',
      this.columnPropertyName,
      'link'
    ];
  }

  onNavigateToItem(item: PrStatistics): void {
    this.navigateItem.emit(item);
  }
}
