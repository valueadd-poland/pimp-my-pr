import { Component, OnInit } from '@angular/core';
import { TableConfig } from '@pimp-my-pr/pmp-web/shared/domain';

const mockedData = {
  data: {
    data: [
      {
        id: 0,
        user: 'Gerald Parsons',
        pendingPr: 40,
        sumOfTimePrWaiting: 45,
        toCheck: 540,
        longestPr: 400
      },
      {
        id: 1,
        user: 'Jack McGee',
        pendingPr: 5,
        sumOfTimePrWaiting: 105,
        toCheck: 540,
        longestPr: 50
      },
      {
        id: 2,
        user: 'Elizabeth Bailey',
        pendingPr: 3,
        sumOfTimePrWaiting: 15,
        toCheck: 40,
        longestPr: 40
      },
      {
        id: 3,
        user: 'Charlotte Gordon',
        pendingPr: 1,
        sumOfTimePrWaiting: 1,
        toCheck: 10,
        longestPr: 10
      }
    ],
    pagination: {
      page: 1,
      size: 4,
      total: 4
    }
  },
  errors: null
};

@Component({
  selector: 'pimp-my-pr-pmp-web-repository-users-feature',
  templateUrl: './pmp-web-repository-users-feature.component.html',
  styleUrls: ['./pmp-web-repository-users-feature.component.scss']
})
export class PmpWebRepositoryUsersFeatureComponent implements OnInit {
  tableConfig: TableConfig;
  private displayedColumns = [
    'avatar',
    'user',
    'pendingPr',
    'sumOfTimePrWaiting',
    'toCheck',
    'longestPr',
    'link'
  ];

  constructor() {}

  ngOnInit(): void {
    this.initTableConfig();
  }

  private initTableConfig(): void {
    this.tableConfig = {
      columns: this.displayedColumns,
      data: mockedData.data.data,
      pagination: mockedData.data.pagination
    };
  }
}
