import { BitbucketUserEntity } from './bitbucket-user.entity';
import { BitbucketUuidUtil } from './bitbucket-uuid.util';

export const mapBitbucketUser = (
  param: BitbucketUserEntity
): { id: string; name: string; avatarUrl: string } => ({
  id: BitbucketUuidUtil.parseFrom(param.uuid),
  name: param.display_name,
  avatarUrl: param.links.avatar.href
});
