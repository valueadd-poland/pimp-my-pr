import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { SingleUserStatisticsResponse } from '@pimp-my-pr/shared/domain';

const mockedData: SingleUserStatisticsResponse = {
  id: 111,
  name: 'Krzysztof Kolumb',
  avatarUrl: 'https://forum.jaslo4u.pl/download/file.php?avatar=29129_1490859586.gif',
  repositories: [
    {
      fullName: 'fullName',
      name: 'JavaBackend',
      repositoryPictureUrl: 'https://static.alphacoders.com/avatars/21577.jpg',
      owner: 'owner',
      prsStatistics: [
        {
          author: 'Filip Chajzer',
          id: 123,
          authorAvatarUrl:
            'https://steamuserimages-a.akamaihd.net/ugc/794239356574677969/E12388F9644B085E342153360759BA2D788C3D12/',
          commentsCount: 6,
          createdAt: 'dupa',
          linesOfCodeToCheck: 118,
          reviewCommentsCount: 0,
          timeWaiting: '76',
          title: 'Crud users',
          url: 'https://google.com'
        }
      ]
    }
  ]
};

@Component({
  selector: 'pmp-single-user-statistics',
  templateUrl: './single-user-statistics.component.html',
  styleUrls: ['./single-user-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleUserStatisticsComponent implements OnInit {
  mockedData = mockedData;
  user: string | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.readRouteUserId();
  }

  private readRouteUserId(): void {
    this.route.params.pipe(first()).subscribe(params => (this.user = params.id));
  }
}
