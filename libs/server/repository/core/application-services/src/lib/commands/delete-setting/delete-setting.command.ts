import { ICommand } from '@nestjs/cqrs';

export class DeleteSettingCommand implements ICommand {
  constructor(public id: string) {}
}
