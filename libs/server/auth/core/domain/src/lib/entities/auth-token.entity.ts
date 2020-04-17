import { f } from '@marcj/marshal';

export class AuthTokenEntity {
  @f
  token: string;

  @f
  scope: string;

  @f
  type: string;
}
