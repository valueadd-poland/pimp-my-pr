export abstract class RemoteTokenCryptoService {
  abstract encrypt(token: string): Promise<string>;
  abstract decrypt(token: string): Promise<string>;
}
