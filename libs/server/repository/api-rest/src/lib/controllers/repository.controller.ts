import { Body, Controller, Post } from '@nestjs/common';
import {
  AddRepositoryCommand,
  RepositoryFacade
} from '@pimp-my-pr/server/repository/core/application-services';
import { AddRepositoryDto } from '../dtos/add-repository.dto';

@Controller()
export class RepositoryController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @Post('repository')
  addRepository(@Body() addRepositoryDto: AddRepositoryDto): Promise<void> {
    return this.repositoryFacade.addRepository(
      new AddRepositoryCommand(addRepositoryDto.repositoryName)
    );
  }
}
