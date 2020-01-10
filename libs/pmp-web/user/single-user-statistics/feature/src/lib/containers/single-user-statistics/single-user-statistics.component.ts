import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

const mockedData = [
  {
    repository: {
      name: 'java',
      picture: 'https://d301sr5gafysq2.cloudfront.net/39e6dc2e5ab0/img/repo-avatars/java.png'
    },
    data: [
      {
        title: 'crud users',
        id: '#1',
        waitingTime: '35 hours',
        codeLines: 540,
        author: { name: 'Filip Chajzer', picture: '' },
        comments: []
      },
      {
        title: 'crud comments',
        id: '#3',
        waitingTime: '28 hours',
        codeLines: 20,
        author: { name: 'Filip Chajzer', picture: '' },
        comments: []
      },
      {
        title: 'unit tests for users',
        id: '#4',
        waitingTime: '4 hours',
        codeLines: 145,
        author: { name: 'Filip Chajzer', picture: '' },
        comments: []
      },
      {
        title: 'unit tests for comments',
        id: '#5',
        waitingTime: '34 minutes',
        codeLines: 4,
        author: { name: 'Filip Chajzer', picture: '' },
        comments: []
      }
    ]
  },
  {
    repository: {
      name: 'php',
      picture: 'https://d301sr5gafysq2.cloudfront.net/39e6dc2e5ab0/img/repo-avatars/php.png'
    },
    data: [
      {
        title: 'crud users',
        id: '#1',
        waitingTime: '35 hours',
        codeLines: 540,
        author: { name: 'Filip Chajzer', picture: '' },
        comments: []
      },
      {
        title: 'crud comments',
        id: '#3',
        waitingTime: '28 hours',
        codeLines: 20,
        author: { name: 'Filip Chajzer', picture: '' },
        comments: []
      },
      {
        title: 'unit tests for users',
        id: '#4',
        waitingTime: '4 hours',
        codeLines: 145,
        author: { name: 'Filip Chajzer', picture: '' },
        comments: []
      },
      {
        title: 'unit tests for comments',
        id: '#5',
        waitingTime: '34 minutes',
        codeLines: 4,
        author: { name: 'Filip Chajzer', picture: '' },
        comments: []
      }
    ]
  }
];

@Component({
  // tslint:disable-next-line:component-selector
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
