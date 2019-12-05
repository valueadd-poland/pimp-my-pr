import { Component, Input, OnInit } from '@angular/core';
import { TableConfig } from '@pimp-my-pr/pmp-web/shared/domain';

@Component({
  selector: 'pimp-my-pr-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input()
  tableConfig: TableConfig;

  constructor() {}

  ngOnInit(): void {}
}
