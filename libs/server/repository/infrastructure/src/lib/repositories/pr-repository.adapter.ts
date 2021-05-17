import { Injectable } from '@nestjs/common';
import {
  PrRepository,
  RepositoryRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { PrSchema } from '../typeorm/schema/pr.schema';

@Injectable()
export class PrRepositoryAdapter extends PrRepository {
  constructor(
    @InjectRepository(PrSchema as any)
    private typeOrmRepository: Repository<PrEntity>,
    private repositoryRepository: RepositoryRepository
  ) {
    super();
  }

  findByRepositoryId(repositoryId: string): Promise<PrEntity[]> {
    return this.repositoryRepository.getById(repositoryId).then(repository => repository.prs);
  }

  async save(pr: PrEntity): Promise<void> {
    console.log(pr);
    await this.typeOrmRepository.save(pr);
  }
}
