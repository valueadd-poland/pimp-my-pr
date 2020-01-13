import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

const mockedData = [
  {
    repository: {
      name: 'java',
      picture: 'https://d301sr5gafysq2.cloudfront.net/39e6dc2xe5ab0/img/repo-avatars/java.png'
    },
    data: [
      {
        comments: ['elo1', 'elo2'],
        id: '#4',
        prUrl: 'https://google.com',
        sumOfTimePrWaiting: 37,
        title: 'Crud users',
        toCheck: 118,
        user: 'Filip Chajzer',
        userPicture: 'https://avatarfiles.alphacoders.com/431/thumb-4311.gif'
      },
      {
        comments: ['elo3', 'elo4'],
        id: '#4',
        prUrl: 'https://google.com',
        sumOfTimePrWaiting: 51,
        title: 'Crud admins',
        toCheck: 141,
        user: 'Filip Chajzer',
        userPicture: 'https://avatarfiles.alphacoders.com/431/thumb-4311.gif'
      }
    ]
  }
];

@Component({
  selector: 'pmp-single-user-statistics',
  templateUrl: './single-user-statistics.component.html',
  styleUrls: ['./single-user-statistics.component.scss']
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
