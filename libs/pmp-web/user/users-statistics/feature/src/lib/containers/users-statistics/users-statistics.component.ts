import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { TableConfig } from '@pimp-my-pr/pmp-web/shared/domain';
import { UserStatistics } from '@pimp-my-pr/shared/domain';
import { UserFacade } from '@pimp-my-pr/pmp-web/user/data-access';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router } from '@angular/router';

@Component({
  selector: 'pimp-my-pr-users-statistics',
  templateUrl: './users-statistics.component.html',
  styleUrls: ['./users-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersStatisticsComponent implements OnInit, OnDestroy {
  tableConfig: TableConfig<UserStatistics[]>;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private userFacade: UserFacade
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.userFacade.userStatisticsCollection$.pipe(untilDestroyed(this)).subscribe(statistics => {
      this.initTableConfig(statistics);
      this.cdr.markForCheck();
    });
    this.userFacade.getUserStatisticsCollection({});
  }

  onNavigateToUser(userStatistics: UserStatistics): void {
    this.router.navigate(['user', userStatistics.name]);
  }

  private initTableConfig(data: UserStatistics[]): void {
    this.tableConfig = {
      columns: [
        { name: 'user', property: 'name', label: 'User' },
        {
          name: 'pendingPrs',
          property: 'pendingPrs',
          label: 'Pending PR',
          isOrderColumn: true
        },
        {
          name: 'sumOfHoursPrsWaiting',
          property: 'sumOfHoursPrsWaiting',
          label: 'Sum of time PR waiting'
        },
        {
          name: 'linesOfCodeToCheck',
          property: 'linesOfCodeToCheck',
          label: 'To check [lines of code]'
        },
        {
          name: 'longestPrLinesOfCode',
          property: 'longestPrLinesOfCode',
          label: 'Longest PR [lines of code]'
        }
      ],
      data: data
    };
  }
}
