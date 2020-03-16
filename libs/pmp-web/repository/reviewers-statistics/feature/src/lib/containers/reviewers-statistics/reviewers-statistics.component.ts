import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewersFacade } from '@pimp-my-pr/pmp-web/repository/reviewers-statistics/data-access';
import { UserStatistics } from '@pimp-my-pr/shared/domain';

@Component({
  selector: 'pmp-users-statistics',
  templateUrl: './reviewers-statistics.component.html',
  styleUrls: ['./reviewers-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewersStatisticsComponent implements OnInit {
  reviewersStatisticsCollection$ = this.userFacade.reviewersStatisticsCollection$;
  reviewersStatisticsCollectionLoading$ = this.userFacade.reviewersStatisticsCollectionLoading$;

  constructor(private router: Router, private userFacade: ReviewersFacade) {}

  ngOnInit(): void {
    this.userFacade.getReviewersStatisticsCollection({});
  }

  onNavigateToUser(userStatistics: UserStatistics): void {
    this.router.navigate(['user', userStatistics.name], {
      state: { avatarUrl: userStatistics.avatarUrl }
    });
  }
}
