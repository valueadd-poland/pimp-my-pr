import {
  BitbucketAuthTokenRepository,
  GithubAuthTokenRepository
} from '@pimp-my-pr/server/auth/infrastructure';
import { Platform } from '@pimp-my-pr/shared/domain';

export const authTokenRepositoryFactory = (
  githubAuthTokenRepository: GithubAuthTokenRepository,
  bitbucketAuthTokenRepository: BitbucketAuthTokenRepository
) => (platform: Platform) => {
  switch (platform) {
    case Platform.github:
      return githubAuthTokenRepository;

    case Platform.bitbucket:
      return bitbucketAuthTokenRepository;

    default:
      throw new Error('No AuthToken repository initialized');
  }
};
