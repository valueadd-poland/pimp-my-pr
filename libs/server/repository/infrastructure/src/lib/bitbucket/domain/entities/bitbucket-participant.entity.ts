import { BitbucketParticipantRole } from '../enums/bitbucket-participant-role.enum';
import { BitbucketParticipantUserEntity } from './bitbucket-participant-user.entity';

export interface BitbucketParticipantEntity {
  role: BitbucketParticipantRole;
  participated_on: Date;
  approved: boolean;
  user: BitbucketParticipantUserEntity;
}
