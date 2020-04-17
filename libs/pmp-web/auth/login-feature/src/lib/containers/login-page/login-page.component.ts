import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@pimp-my-pr/pmp-web/auth/data-access';
import {
  AvailableSystems,
  ENVIRONMENT_ADAPTER,
  EnvironmentAdapter,
  githubAuthConfig
} from '@pimp-my-pr/pmp-web/shared/domain';

@Component({
  selector: 'pimp-my-pr-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginInProgress$ = this.authFacade.loginInProgress$;

  constructor(
    @Inject(ENVIRONMENT_ADAPTER) private environment: EnvironmentAdapter,
    private router: Router,
    private authFacade: AuthFacade
  ) {}

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

  ngOnInit(): void {
    if (!!this.authFacade.getSavedToken()) {
      this.router.navigate(['/user']);
    }
  }

  login(system: string): void {
    switch (system) {
      case AvailableSystems.github:
        window.location.href = `${githubAuthConfig.authLink}?client_id=${this.environment.githubClientId}`;
        break;
      case AvailableSystems.bitbucket:
        this.router.navigate(['user']);
        break;
    }
  }
}
