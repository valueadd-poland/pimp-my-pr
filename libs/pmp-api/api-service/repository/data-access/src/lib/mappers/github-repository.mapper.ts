import { GithubRepositoryEntity } from '../domain/entities/github-repository.entity';
import { RepositoryModel } from '@pimp-my-pr/pmp-api/api-service/repository/domain';
import { Mapper } from '@pimp-my-pr/pmp-api/shared/domain';
import { NotImplementedException } from '@nestjs/common';
import { GithubOrganizationMapper } from './github-organization.mapper';

export class GithubRepositoryMapper implements Mapper<GithubRepositoryEntity, RepositoryModel> {
  mapFrom(param: GithubRepositoryEntity): RepositoryModel {
    return {
      fullName: param.full_name,
      id: param.id,
      name: param.name,
      owner: param.owner.login,
      prs: [],
      pictureUrl: new GithubOrganizationMapper().mapFrom(param.organization).avatarUrl
    };
  }

  mapTo(param: RepositoryModel): GithubRepositoryEntity {
    throw new NotImplementedException('Mapping to github repository format is not implemented');
  }
}
