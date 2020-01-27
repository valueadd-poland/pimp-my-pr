import { Component, OnDestroy, OnInit } from '@angular/core';
import { SingleRepositoryStatisticsFacade } from '@pimp-my-pr/pmp-web/repository/data-access-single-repository-statistics';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'pimp-my-pr-repository-statistics',
  templateUrl: './repository-statistics.component.html',
  styleUrls: ['./repository-statistics.component.scss']
})
export class RepositoryStatisticsComponent implements OnDestroy, OnInit {
  repositoryName: string | null;
  repository$ = this.facade.repositoryStatistics$;

  constructor(private route: ActivatedRoute, private facade: SingleRepositoryStatisticsFacade) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.initGetRepositoryStatistics();
  }

  private initGetRepositoryStatistics(): void {
    this.route.params.pipe(first()).subscribe(params => {
      this.repositoryName = params.repositoryName;
      this.facade.getRepositoryStatistics({ id: this.repositoryName });
    });
  }
}
