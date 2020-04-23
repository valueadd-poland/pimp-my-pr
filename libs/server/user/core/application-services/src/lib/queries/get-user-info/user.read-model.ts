import { User } from '@pimp-my-pr/shared/domain';
import { ApiProperty } from '@nestjs/swagger';

export class UserReadModel implements User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  avatarUrl: string;

  constructor(name: string, avatarUrl: string, id: string) {
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.id = id;
  }
}
