import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrStatistics } from '@pimp-my-pr/shared/domain';

@Component({
  selector: 'pmp-table-pr-statistic',
  templateUrl: './table-pr-statistic.component.html',
  styleUrls: ['./table-pr-statistic.component.scss']
})
export class TablePrStatisticComponent implements OnInit {
  @Input()
  tableData: PrStatistics[];

  @Input()
  columnPropertyName: string;

  @Output()
  navigateItem = new EventEmitter<PrStatistics>();

  displayedColumns: string[];

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
