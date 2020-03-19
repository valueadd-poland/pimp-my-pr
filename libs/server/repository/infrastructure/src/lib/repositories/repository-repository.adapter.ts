import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { Repository } from 'typeorm';
import {
  remoteRepositoryRepositoryFactoryToken,
  RemoteRepositoryRepository
} from './remote-repository.repository';
import { Platform } from '@pimp-my-pr/shared/domain';

@Injectable()
export class RepositoryRepositoryAdapter extends RepositoryRepository {
  constructor(
    @InjectRepository(RepositoryEntity) private typeOrmRepository: Repository<RepositoryEntity>,
    @Inject(remoteRepositoryRepositoryFactoryToken)
    private repositoryFactory: (platform: Platform) => RemoteRepositoryRepository
  ) {
    super();
  }

  async findAll(): Promise<RepositoryEntity[]> {
    return this.typeOrmRepository.find();
  }

  getSingleRepository(id: string, token: string, platform: Platform): Promise<RepositoryEntity> {
    const repository = this.repositoryFactory(platform);

    return this.typeOrmRepository.findOne(id).then(result => {
      return repository.getSingleRepositoryById(id, token, result ? result.owner : null);
    });
  }

  getSingleRepositoryByName(
    fullName: string,
    token: string,
    platform: Platform
  ): Promise<RepositoryEntity> {
    const repository = this.repositoryFactory(platform);

    return repository.getSingleRepositoryByName(fullName, token);
  }

  async save(repository: RepositoryEntity): Promise<void> {
    await this.typeOrmRepository.save(repository);
  }
}
