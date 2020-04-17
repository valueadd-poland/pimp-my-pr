import { f } from '@marcj/marshal';

export class User {
  constructor(id: string, name: string, avatarUrl: string) {
    this.id = id;
    this.name = name;
    this.avatarUrl = avatarUrl;
  }

  @f
  avatarUrl: string;

  @f.primary()
  id: string;

  @f
  name: string;
}
