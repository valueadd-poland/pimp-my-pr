import { plainToClass } from '@marcj/marshal';
import { User } from '@pimp-my-pr/server/user/core/domain';
import { GithubUser } from '../repositories/github/github-user.entity';

export function mapGithubUser(githubUser: GithubUser): User {
  return plainToClass(User, {
    avatarUrl: githubUser.avatar_url,
    id: githubUser.id,
    name: githubUser.login
  });
}
