import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';

@Injectable()
export class UserRepositoryGuard implements CanActivate {
  constructor(private repositoryRepository: RepositoryRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const repository = await this.repositoryRepository.getById(request.params.repositoryId);
    return repository.userId === request.user.id;
  }
}
