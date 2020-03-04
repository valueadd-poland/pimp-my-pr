import { Component, OnInit } from '@angular/core';
import { AvailableSystems } from '@pimp-my-pr/pmp-web/shared/domain';
import { Router } from '@angular/router';

@Component({
  selector: 'pimp-my-pr-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router) {}

  systems = [
    {
      imageSrc: 'assets/images/github_logo.png',
      name: AvailableSystems.github,
      color: '#2cbe4e'
    },
    {
      imageSrc: 'assets/images/bitbucket_logo.png',
      name: AvailableSystems.bitbucket,
      color: '#0052CC'
    }
  ];

  ngOnInit(): void {}

  login(system: string): void {
    switch (system) {
      case AvailableSystems.github:
      case AvailableSystems.bitbucket:
        this.router.navigate(['reviewer']);
        break;
    }
  }
}
