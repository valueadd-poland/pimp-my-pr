import { Injectable } from '@nestjs/common';
import { AuthTokenEntity } from '@pimp-my-pr/server/auth/core/domain';
import { AuthTokenRepository } from '@pimp-my-pr/server/auth/core/domain-services';
import { bitbucketConfig, githubConfig } from '@pimp-my-pr/server/shared/core';
import { urlFactory } from '@valueadd/typed-urls';
import { BitbucketAuthTokenRepository } from './bitbucket-auth-token.repository';
import { GithubAuthTokenRepository } from './github-auth-token.repository';

@Injectable()
export class AuthTokenRepositoryAdapter extends AuthTokenRepository {
  endpoints = {
    getBitbucketAccessToken: urlFactory(bitbucketConfig.authUrl),
    getGithubAccessToken: urlFactory(githubConfig.authUrl)
  };

  constructor(
    private bitbucketAuthRepository: BitbucketAuthTokenRepository,
    private githubAuthRepository: GithubAuthTokenRepository
  ) {
    super();
  }

  getBitbucketAccessToken(bitbucketCode: string): Promise<AuthTokenEntity> {
    return this.bitbucketAuthRepository.getBitbucketAccessToken(bitbucketCode);
  }

  getGithubAccessToken(githubCode: string): Promise<AuthTokenEntity> {
    return this.githubAuthRepository.getGithubAccessToken(githubCode);
  }
}
