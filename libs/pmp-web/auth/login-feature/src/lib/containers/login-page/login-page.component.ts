import { Component } from '@angular/core';
import { AuthFacade } from '@pimp-my-pr/pmp-web/auth/data-access';
import {
  bitbucketAuthConfig,
  githubAuthConfig,
  gitlabAuthConfig,
  environment
} from '@pimp-my-pr/pmp-web/shared/config';
import { Platform } from '@pimp-my-pr/shared/domain';

@Component({
  selector: 'pimp-my-pr-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginInProgress$ = this.authFacade.loginInProgress$;

  constructor(private authFacade: AuthFacade) {}

  systems = [
    {
      imageSrc: 'assets/images/github_logo.png',
      name: Platform.github,
      color: '#2cbe4e'
    },
    {
      imageSrc: 'assets/images/bitbucket_logo.png',
      name: Platform.bitbucket,
      color: '#0052CC'
    }
    // {
    //   imageSrc: 'assets/images/gitlab_logo.png',
    //   name: Platform.gitlab,
    //   color: '#FC6D27'
    // }
  ];

  login(system: string): void {
    switch (system) {
      case Platform.github:
        window.location.href = `${githubAuthConfig.authLink}?client_id=${environment.githubClientId}`;
        break;
      case Platform.gitlab:
        window.location.href = `${gitlabAuthConfig.authLink}?client_id=${environment.gitlabClientId}&redirect_uri=${environment.gitlabRedirectUri}&response_type=${gitlabAuthConfig.responseType}&scope=${gitlabAuthConfig.scope}`;
        break;
      case Platform.bitbucket:
        window.location.href = `${bitbucketAuthConfig.authLink}?client_id=${environment.bitbucketClientId}&response_type=code`;
        break;
    }
  }
}
