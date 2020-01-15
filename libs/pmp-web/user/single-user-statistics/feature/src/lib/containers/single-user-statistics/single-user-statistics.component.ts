import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { TableConfig } from '@pimp-my-pr/pmp-web/shared/domain';
import { RepositoryStatistics } from '@pimp-my-pr/shared/domain';

const mockedData = [
  {
    repository: {
      name: 'java',
      picture:
        'https://mpng.pngfly.com/20190713/ppg/kisspng-java-development-kit-programming-language-computer-download-logo-transparent-background-java-png-imag-5d2a9388bf5271.0703141315630713687837.jpg'
    },
    data: [
      // repository-statistics
      {
        comments: ['elo1', 'elo2'],
        id: '#4',
        prUrl: 'https://google.com',
        sumOfHoursPrsWaiting: 37,
        title: 'Crud users',
        linesOfCodeToCheck: 118,
        user: 'Filip Chajzer',
        userPicture: 'https://avatarfiles.alphacoders.com/431/thumb-4311.gif'
      },
      {
        comments: ['elo3', 'elo4'],
        id: '#4',
        prUrl: 'https://google.com',
        sumOfHoursPrsWaiting: 51,
        title: 'Crud admins',
        linesOfCodeToCheck: 141,
        user: 'Filip Chajzer',
        userPicture: 'https://avatarfiles.alphacoders.com/431/thumb-4311.gif'
      }
    ],
    pagination: {
      page: 1,
      size: 4,
      total: 4
    }
  },
  {
    repository: {
      name: 'java',
      picture:
        'https://mpng.pngfly.com/20190713/ppg/kisspng-java-development-kit-programming-language-computer-download-logo-transparent-background-java-png-imag-5d2a9388bf5271.0703141315630713687837.jpg'
    },
    data: [
      // repository-statistics
      {
        comments: ['elo1', 'elo2'],
        id: '#4',
        prUrl: 'https://google.com',
        sumOfHoursPrsWaiting: 37,
        title: 'Crud users',
        linesOfCodeToCheck: 118,
        user: 'Filip Chajzer',
        userPicture: 'https://avatarfiles.alphacoders.com/431/thumb-4311.gif'
      },
      {
        comments: ['elo3', 'elo4'],
        id: '#4',
        prUrl: 'https://google.com',
        sumOfHoursPrsWaiting: 51,
        title: 'Crud admins',
        linesOfCodeToCheck: 141,
        user: 'Filip Chajzer',
        userPicture: 'https://avatarfiles.alphacoders.com/431/thumb-4311.gif'
      }
    ],
    pagination: {
      page: 1,
      size: 4,
      total: 4
    }
  }
];

@Component({
  selector: 'pmp-single-user-statistics',
  templateUrl: './single-user-statistics.component.html',
  styleUrls: ['./single-user-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleUserStatisticsComponent implements OnInit {
  mockedData = mockedData;
  user: string | null;

  private displayedColumns = [
    'id',
    'title',
    'sumOfTimePrWaiting',
    'toCheck',
    'author',
    'comments',
    'link'
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.readRouteUserId();
  }

  createTableConfigForData(mock): TableConfig<RepositoryStatistics[]> {
    return {
      columns: this.displayedColumns,
      pagination: mock.pagination,
      data: mock.data
    };
  }

  private readRouteUserId(): void {
    this.route.params.pipe(first()).subscribe(params => (this.user = params.id));
  }
}
