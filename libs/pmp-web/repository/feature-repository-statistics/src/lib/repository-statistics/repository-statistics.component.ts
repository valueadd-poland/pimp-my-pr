import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SingleRepositoryStatisticsFacade } from '@pimp-my-pr/pmp-web/repository/data-access-single-repository-statistics';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { RepositoryModel } from '@pimp-my-pr/shared/domain';
import { first } from 'rxjs/operators';

const mockedData = {
  // TODO mocked data for repository
  owner: 'valueadd',
  fullName: 'pimp-my-pr',
  name: 'pmp',
  repositoryPictureUrl: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
  prsStatistics: [
    {
      author: 'asda',
      authorAvatarUrl: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      commentsCount: 123,
      createdAt: '12/12/12',
      linesOfCodeToCheck: 3245,
      reviewCommentsCount: 234,
      id: 2345,
      timeWaiting: '124',
      title: '12414',
      url: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'
    }
  ]
};

@Component({
  selector: 'pimp-my-pr-repository-statistics',
  templateUrl: './repository-statistics.component.html',
  styleUrls: ['./repository-statistics.component.scss']
})
export class RepositoryStatisticsComponent implements OnDestroy, OnInit {
  repositoryName: string | null;
  repository: RepositoryModel;

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private facade: SingleRepositoryStatisticsFacade
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.initGetRepositoryStatistics();
    this.initSubscribeRepositoryStatistics();
  }

  private initSubscribeRepositoryStatistics(): void {
    this.facade.repositoryStatistics$.pipe(untilDestroyed(this)).subscribe(repository => {
      this.repository = mockedData; /* TODO repository instead mockedData */
      this.cdr.markForCheck();
    });
  }

  private initGetRepositoryStatistics(): void {
    this.route.params.pipe(first()).subscribe(params => {
      this.repositoryName = params.repositoryName;
      this.facade.getRepositoryStatistics({ id: this.repositoryName });
    });
  }
}
