import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@pimp-my-pr/server/user/core/domain';
import { UserRepository } from '@pimp-my-pr/server/user/core/domain-services';
import { Platform } from '@pimp-my-pr/shared/domain';
import { Repository } from 'typeorm';
import { UserSchema } from '../schema/user.schema';
import { remoteUserRepositoryFactoryToken } from './remote-user-repository.factory';
import { RemoteUserRepository } from './remote-user.repository';

@Injectable()
export class UserRepositoryAdapter extends UserRepository {
  constructor(
    @Inject(remoteUserRepositoryFactoryToken)
    private remoteUserRepository: (platform: Platform) => RemoteUserRepository,
    @InjectRepository(UserSchema as any) private typeOrmRepository: Repository<User>
  ) {
    super();
  }

  findById(id: string): Promise<User | undefined> {
    return this.typeOrmRepository.findOne(id);
  }

  getById(userId: string): Promise<User> {
    return this.typeOrmRepository.findOneOrFail(userId);
  }

  loadCurrentUser(token: string, platform: Platform): Promise<User> {
    const remoteUserRepository = this.remoteUserRepository(platform);
    return remoteUserRepository.getCurrentUser(token);
  }

  save(user: User): Promise<User> {
    return this.typeOrmRepository.save(user);
  }
}
