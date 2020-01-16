import { GithubOrganizationEntity } from '../domain/entities/github-organization.entity';
import { Mapper } from '@pimp-my-pr/pmp-api/shared/domain';
import { NotImplementedException } from '@nestjs/common';
import { OrganizationModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';

export class GithubOrganizationMapper
  implements Mapper<GithubOrganizationEntity, OrganizationModel> {
  mapFrom(param: GithubOrganizationEntity): OrganizationModel {
    return {
      avatarUrl: param.avatar_url,
      gravatarUrl: param.gravatar_url,
      id: param.id,
      name: param.login
    };
  }

  mapTo(param: OrganizationModel): GithubOrganizationEntity {
    throw new NotImplementedException('Mapping to organization entity format is not implemented');
  }
}
