import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TableConfig } from '@pimp-my-pr/pmp-web/shared/domain';
import { UserStatistics } from '@pimp-my-pr/shared/domain';
import { UserFacade } from '@pimp-my-pr/pmp-web/user/data-access';

const mockedData = {
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
};

@Component({
  selector: 'pimp-my-pr-users-statistics',
  templateUrl: './users-statistics.component.html',
  styleUrls: ['./users-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersStatisticsComponent implements OnInit {
  tableConfig: TableConfig<UserStatistics[]>;
  private displayedColumns = [
    'avatar',
    'user',
    'pendingPr',
    'sumOfTimePrWaiting',
    'toCheck',
    'longestPr',
    'link'
  ];

  constructor(private chDRef: ChangeDetectorRef, private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.userFacade.userStatisticsCollection$.subscribe(statistics => {
      this.initTableConfig(statistics);
      this.chDRef.markForCheck();
    });
    this.userFacade.getUserStatisticsCollection({});
  }

  private initTableConfig(data: UserStatistics[]): void {
    this.tableConfig = {
      columns: this.displayedColumns,
      data: data,
      pagination: mockedData.pagination
    };
  }
}
