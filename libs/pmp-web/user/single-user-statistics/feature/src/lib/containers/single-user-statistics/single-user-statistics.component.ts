import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { PrStatistics, SingleUserStatisticsResponse } from '@pimp-my-pr/shared/domain';
import { SingleUserStatisticsFacade } from '@pimp-my-pr/pmp-web/user/single-user-statistics/data-access';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'pmp-single-user-statistics',
  templateUrl: './single-user-statistics.component.html',
  styleUrls: ['./single-user-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleUserStatisticsComponent implements OnInit, OnDestroy {
  userName: string | null;
  userStatistics: SingleUserStatisticsResponse;

  constructor(
    private route: ActivatedRoute,
    private facade: SingleUserStatisticsFacade,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.initGetUserStatistics();
    this.initSubscribeUserStatistics();
  }

  onNavigateItem(prStatistics: PrStatistics): void {
    window.open(prStatistics.url, '_blank');
  }

  private initSubscribeUserStatistics(): void {
    this.facade.singleUserStatisticsResponse$
      .pipe(untilDestroyed(this))
      .subscribe(userStatistics => {
        this.userStatistics = userStatistics;
        this.cdr.markForCheck();
      });
  }

  private initGetUserStatistics(): void {
    this.route.params.pipe(first()).subscribe(params => {
      this.userName = params.userName;
      this.facade.getSingleUserStatisticsResponse({ username: this.userName });
    });
  }
}
