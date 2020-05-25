import { EditRepositoryHandler } from './edit-repository.handler';
import { EditRepositoryCommand } from './edit-repository.command';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { Test } from '@nestjs/testing';
import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';
import Mocked = jest.Mocked;

describe('Edit Repository Handler', () => {
  let editRepositoryHandler: EditRepositoryHandler;
  let repositoryRepository: Mocked<RepositoryRepository>;
  const repository = new RepositoryEntity('123', 'test', 'test', 'test', '1');

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: RepositoryRepository,
          useValue: {}
        },
        EditRepositoryHandler
      ]
    }).compile();

    repositoryRepository = module.get(RepositoryRepository);
    editRepositoryHandler = module.get<EditRepositoryHandler>(EditRepositoryHandler);
  });

  describe('update', () => {
    it('execute save repository', async () => {
      const command: EditRepositoryCommand = {
        repositoryId: '123',
        maxLines: 2,
        maxWaitingTime: 3
      };

      repositoryRepository.getById = jest.fn();
      repositoryRepository.getById.mockResolvedValue(repository);

      repository.edit = jest.fn();
      repositoryRepository.save = jest.fn();

      await editRepositoryHandler.execute(command);
      expect(repository.edit).toHaveBeenCalledWith({
        maxLines: command.maxLines,
        maxWaitingTime: command.maxWaitingTime
      });

      expect(repositoryRepository.save).toHaveBeenCalledWith(repository);
    });
  });
});
