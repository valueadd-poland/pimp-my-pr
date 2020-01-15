import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

const mockedUser = {
  name: 'Krzysztof Kolumb',
  picture: 'https://avatarfiles.alphacoders.com/893/thumb-89303.gif'
};

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
  mockedUser = mockedUser;
  user: string | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.readRouteUserId();
  }

  private readRouteUserId(): void {
    this.route.params.pipe(first()).subscribe(params => (this.user = params.id));
  }
}
