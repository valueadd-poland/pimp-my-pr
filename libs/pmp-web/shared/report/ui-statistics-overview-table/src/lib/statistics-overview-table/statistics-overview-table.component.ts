import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { RepositoryStatistics, UserStatistics } from '@pimp-my-pr/shared/domain';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'pmp-statistics-overview-table',
  templateUrl: './statistics-overview-table.component.html',
  styleUrls: ['./statistics-overview-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsOverviewTableComponent {
  @Input()
  set data(data: (UserStatistics | RepositoryStatistics)[]) {
    this.dataSource = new MatTableDataSource<UserStatistics | RepositoryStatistics>(data);
    this.dataSource.sort = this.sort;
  }

  @Input()
  isLoading = false;

  @Output()
  navigateToItem = new EventEmitter<UserStatistics | RepositoryStatistics>();

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  dataSource: MatTableDataSource<UserStatistics | RepositoryStatistics>;
  displayColumns = [
    'avatar',
    'name',
    'pendingPrs',
    'sumOfHoursPrsWaiting',
    'linesOfCodeToCheck',
    'longestPrLinesOfCode',
    'link'
  ];

  onNavigateToItem(item: any): void {
    this.navigateToItem.emit(item);
  }
}
