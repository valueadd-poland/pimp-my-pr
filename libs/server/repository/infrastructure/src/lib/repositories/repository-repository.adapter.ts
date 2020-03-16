import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { Repository } from 'typeorm';
import { GithubRepositoryRepository } from '../github/repositories/github-repository.repository';

@Injectable()
export class RepositoryRepositoryAdapter extends RepositoryRepository {
  constructor(
    @InjectRepository(RepositoryEntity) private typeOrmRepository: Repository<RepositoryEntity>,
    private githubRepository: GithubRepositoryRepository
  ) {
    super();
  }

  async findAll(): Promise<RepositoryEntity[]> {
    return this.typeOrmRepository.find();
  }

  getSingleRepository(id: string): Promise<RepositoryEntity> {
    return this.githubRepository.getSingleRepository(id);
  }

  getSingleRepositoryByName(fullName: string): Promise<RepositoryEntity> {
    return this.githubRepository.getSingleRepositoryByName(fullName);
  }

  save(repository: RepositoryEntity): Promise<void> {
    return this.typeOrmRepository.save(repository).then();
  }
}
