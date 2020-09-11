import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SettingsRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { EditSettingsDto } from '../dtos/edit-settings.dto';

@Injectable()
export class UserSettingsGuard implements CanActivate {
  constructor(private settingsRepository: SettingsRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    for (const patch of (request.body as EditSettingsDto).patch) {
      const setting = await this.settingsRepository.getById(patch.id);
      if (setting.userId !== request.user.id) return false;
    }
    return true;
  }
}
