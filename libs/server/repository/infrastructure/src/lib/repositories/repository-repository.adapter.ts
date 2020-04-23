import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { Platform } from '@pimp-my-pr/shared/domain';
import { Repository } from 'typeorm';
import { RepositorySchema } from '../typeorm/schema/repository.schema';
import {
  RemoteRepositoryRepository,
  remoteRepositoryRepositoryFactoryToken
} from './remote-repository.repository';

@Injectable()
export class RepositoryRepositoryAdapter extends RepositoryRepository {
  constructor(
    @InjectRepository(RepositorySchema as any)
    private typeOrmRepository: Repository<RepositoryEntity>,
    @Inject(remoteRepositoryRepositoryFactoryToken)
    private repositoryFactory: (platform: Platform) => RemoteRepositoryRepository
  ) {
    super();
  }

  async findAll(): Promise<RepositoryEntity[]> {
    return this.typeOrmRepository.find();
  }

  findByUserId(userId: string): Promise<RepositoryEntity[]> {
    return this.typeOrmRepository.find({ userId });
  }

  getById(id: string): Promise<RepositoryEntity> {
    return this.typeOrmRepository.findOneOrFail(id);
  }

  loadRepositoryByName(
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

  async delete(repository: RepositoryEntity): Promise<void> {
    await this.typeOrmRepository.remove(repository);
  }
}
