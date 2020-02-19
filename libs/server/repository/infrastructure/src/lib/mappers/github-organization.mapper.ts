import { NotImplementedException } from '@nestjs/common';
import { OrganizationEntity } from '@pimp-my-pr/server/repository/core/domain';
import { Mapper } from '@pimp-my-pr/server/shared/domain';
import { GithubOrganizationEntity } from '../domain/entities/github-organization.entity';

export class GithubOrganizationMapper
  implements Mapper<GithubOrganizationEntity, OrganizationEntity> {
  mapFrom(param: GithubOrganizationEntity): OrganizationEntity {
    return {
      avatarUrl: param.avatar_url,
      gravatarUrl: param.gravatar_url,
      id: param.id,
      name: param.login
    };
  }

  mapTo(param: OrganizationEntity): GithubOrganizationEntity {
    throw new NotImplementedException('Mapping to organization entity format is not implemented');
  }
}
