import { plainToClass } from '@marcj/marshal';
import { User } from '@pimp-my-pr/server/user/core/domain';
import { GitlabUser } from './gitlab-user.entity';

export function mapGitlabUser(gitlabUser: GitlabUser): User {
  return plainToClass(User, {
    avatarUrl: gitlabUser.avatar_url,
    id: gitlabUser.id,
    name: gitlabUser.username
  });
}
