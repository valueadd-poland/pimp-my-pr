import { Injectable } from '@nestjs/common';
import { RemoteTokenCryptoService } from '@pimp-my-pr/server/auth/port';
import * as crypto from 'crypto';

@Injectable()
export class ServerAuthInfrastructureRemoteTokenCryptoService extends RemoteTokenCryptoService {
  algorithm = 'aes-256-ctr';
  readonly inputEncoding = 'utf8';
  readonly outputEncoding = 'hex';

  constructor(private readonly key: string) {
    super();
  }
  async encrypt(text: string): Promise<string> {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let crypted = cipher.update(text, this.inputEncoding, this.outputEncoding);
    crypted += cipher.final(this.outputEncoding);
    return `${iv.toString('hex')}:${crypted.toString()}`;
  }

  async decrypt(text: string): Promise<string> {
    const textParts = text.split(':');
    const IV = Buffer.from(textParts.shift(), this.outputEncoding);
    const encryptedText = Buffer.from(textParts.join(':'), this.outputEncoding);
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, IV);
    let decrypted = decipher.update(encryptedText, this.outputEncoding, this.inputEncoding);
    decrypted += decipher.final(this.inputEncoding);
    return decrypted.toString();
  }
}
