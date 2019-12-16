import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SynchronizeProjectsCommand } from '../synchronize-projects.command';
import { CreateProjectCommand } from '../create-project.command';
import { ProjectFacade } from '../../project.facade';
import { GetAllExternalProjectsQuery } from '../../queries/get-all-external-projects.query';
import { GetAllExternalPRsQuery } from '../../queries/get-all-external-prs.query';
import { Project, Tokens } from '@pimp-my-pr/pmp-api/project/domain';
import { CreatePRCommand } from '../create-pr.command';

@CommandHandler(SynchronizeProjectsCommand)
export class SynchronizeProjectsHandler
  implements ICommandHandler<SynchronizeProjectsCommand> {
  constructor(private projectFacade: ProjectFacade) {}

  async execute(command: SynchronizeProjectsCommand): Promise<void> {
    // TODO get access tokens
    const accessTokens = {};

    await this.syncProjects(accessTokens);
  }

  private async syncProjects(accessTokens: Tokens): Promise<void> {
    const projects = await this.projectFacade.getAllExternalProjects(
      new GetAllExternalProjectsQuery(accessTokens)
    );
    for (const project of projects) {
      await this.projectFacade.createProject(new CreateProjectCommand(project));
      await this.syncPRs(project, accessTokens);
    }
  }

  private async syncPRs(project: Project, accessTokens: Tokens): Promise<void> {
    const prs = await this.projectFacade.getAllExternalPRs(
      new GetAllExternalPRsQuery(project, accessTokens)
    );
    for (const pr of prs) {
      await this.projectFacade.createPR(new CreatePRCommand(pr));
    }
  }
}
