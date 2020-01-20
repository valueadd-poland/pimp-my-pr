import { Component, Input, OnInit } from '@angular/core';
import { PrStatistics } from '@pimp-my-pr/shared/domain';

@Component({
  selector: 'pmp-table-statistic',
  templateUrl: './table-statistic.component.html',
  styleUrls: ['./table-statistic.component.scss']
})
export class TableStatisticComponent implements OnInit {
  @Input()
  tableData: PrStatistics[];

  @Input()
  columnPropertyName: String;

  displayedColumns: String[];

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

  onNavigateToItem(item: PrStatistics): void {}
}
