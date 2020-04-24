import {
  BitbucketAuthTokenRepository,
  GithubAuthTokenRepository,
  GitlabAuthTokenRepository
} from '@pimp-my-pr/server/auth/infrastructure';
import { Platform } from '@pimp-my-pr/shared/domain';

export const authTokenRepositoryFactory = (
  githubAuthTokenRepository: GithubAuthTokenRepository,
  bitbucketAuthTokenRepository: BitbucketAuthTokenRepository,
  gitlabAuthTokenRepository: GitlabAuthTokenRepository
) => (platform: Platform) => {
  switch (platform) {
    case Platform.github:
      return githubAuthTokenRepository;

    case Platform.bitbucket:
      return bitbucketAuthTokenRepository;

    case Platform.gitlab:
      return gitlabAuthTokenRepository;

    default:
      throw new Error('No AuthToken repository initialized');
  }
};
