import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RepositoryStatistics, ReviewerStatistics } from '@pimp-my-pr/shared/domain';

@Component({
  selector: 'pmp-statistics-overview-table',
  templateUrl: './statistics-overview-table.component.html',
  styleUrls: ['./statistics-overview-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsOverviewTableComponent {
  @Input()
  set data(data: (ReviewerStatistics | RepositoryStatistics)[]) {
    this.dataSource = new MatTableDataSource<ReviewerStatistics | RepositoryStatistics>(data);
    this.dataSource.sort = this.sort;
  }

  @Input()
  isLoading = false;

  @Output()
  navigateToItem = new EventEmitter<ReviewerStatistics | RepositoryStatistics>();

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  dataSource: MatTableDataSource<ReviewerStatistics | RepositoryStatistics>;
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
