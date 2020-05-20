export class EditRepositoryCommand {
  constructor(
    public repositoryId: string,
    public maxLines?: number,
    public maxWaitingTime?: number
  ) {}
}
