import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pmp-single-user-statistics-table',
  templateUrl: './single-user-statistics-table.component.html',
  styleUrls: ['./single-user-statistics-table.component.scss']
})
export class SingleUserStatisticsTableComponent implements OnInit {
  displayedColumns = ['id', 'title', 'waitingTime', 'linesToCheck', 'author', 'comments', 'link'];

  @Input()
  tableData: any[];

  constructor() {}

  ngOnInit(): void {}

  onNavigateToItem(any): void {}
}
