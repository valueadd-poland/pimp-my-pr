import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { Repository } from 'typeorm';
import { RemoteRepositoryRepository } from './remote-repository.repository';

@Injectable()
export class RepositoryRepositoryAdapter extends RepositoryRepository {
  constructor(
    @InjectRepository(RepositoryEntity) private typeOrmRepository: Repository<RepositoryEntity>,
    private repository: RemoteRepositoryRepository
  ) {
    super();
  }

  async findAll(): Promise<RepositoryEntity[]> {
    return this.typeOrmRepository.find();
  }

  getSingleRepository(id: string): Promise<RepositoryEntity> {
    return this.typeOrmRepository.findOne(id).then(result => {
      return this.repository.getSingleRepositoryById(id, result ? result.owner : null);
    });
  }

  getSingleRepositoryByName(fullName: string): Promise<RepositoryEntity> {
    return this.repository.getSingleRepositoryByName(fullName);
  }

  save(repository: RepositoryEntity): Promise<void> {
    return this.typeOrmRepository.save(repository).then();
  }
}
