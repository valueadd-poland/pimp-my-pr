import { NotImplementedException } from '@nestjs/common';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { Mapper } from '@pimp-my-pr/server/shared/domain';
import { GithubRepositoryEntity } from '../domain/entities/github-repository.entity';
import { GithubOrganizationMapper } from './github-organization.mapper';

export class GithubRepositoryMapper implements Mapper<GithubRepositoryEntity, RepositoryEntity> {
  mapFrom(param: GithubRepositoryEntity): RepositoryEntity {
    return {
      fullName: param.full_name,
      id: param.id,
      name: param.name,
      owner: param.owner.login,
      prs: [],
      pictureUrl: new GithubOrganizationMapper().mapFrom(param.organization).avatarUrl
    };
  }

  mapTo(param: RepositoryEntity): GithubRepositoryEntity {
    throw new NotImplementedException('Mapping to github repository format is not implemented');
  }
}
