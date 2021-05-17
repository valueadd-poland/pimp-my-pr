import { Injectable } from '@nestjs/common';
import { ContributorRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContributorEntity } from '@pimp-my-pr/server/repository/core/domain';
import { ContributorSchema } from '../typeorm/schema/contributor.schema';

@Injectable()
export class ContributorRepositoryAdapter extends ContributorRepository {
  constructor(
    @InjectRepository(ContributorSchema as any)
    private typeOrmRepository: Repository<ContributorEntity>
  ) {
    super();
  }

  async save(pr: ContributorEntity): Promise<void> {
    await this.typeOrmRepository.save(pr);
  }

  get(username: string): Promise<ContributorEntity> {
    return this.typeOrmRepository.findOne({ name: username });
  }
}
