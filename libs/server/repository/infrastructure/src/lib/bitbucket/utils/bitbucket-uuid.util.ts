export class BitbucketUuidUtil {
  private static readonly openBrace = '{';
  private static readonly closeBrace = '}';

  // parse from bitbucket UUID format { uuid }
  static parseFrom(bitbucketUUID: string): string {
    return bitbucketUUID.replace(this.openBrace, '').replace(this.closeBrace, '');
  }

  // parse to bibucket UUID format with { uuid }
  static parseTo(uuid: string): string {
    return this.openBrace + uuid + this.closeBrace;
  }
}
