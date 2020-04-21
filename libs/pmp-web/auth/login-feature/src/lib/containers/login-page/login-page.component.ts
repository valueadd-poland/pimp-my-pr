import { Component, Inject } from '@angular/core';
import { AuthFacade } from '@pimp-my-pr/pmp-web/auth/data-access';
import {
  AvailableSystems,
  bitbucketAuthConfig,
  ENVIRONMENT_ADAPTER,
  EnvironmentAdapter,
  githubAuthConfig
} from '@pimp-my-pr/pmp-web/shared/domain';

@Component({
  selector: 'pimp-my-pr-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginInProgress$ = this.authFacade.loginInProgress$;

  constructor(
    @Inject(ENVIRONMENT_ADAPTER) private environment: EnvironmentAdapter,
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

  login(system: string): void {
    switch (system) {
      case AvailableSystems.github:
        window.location.href = `${githubAuthConfig.authLink}?client_id=${this.environment.githubClientId}`;
        break;
      case AvailableSystems.bitbucket:
        window.location.href = `${bitbucketAuthConfig.authLink}?client_id=${this.environment.bitbucketClientId}&response_type=code`;
        break;
    }
  }
}
