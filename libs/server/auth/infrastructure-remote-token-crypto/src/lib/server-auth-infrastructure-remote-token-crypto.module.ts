import { DynamicModule, Module, Provider } from '@nestjs/common';
import { RemoteTokenCryptoService } from '@pimp-my-pr/server/auth/port';
import { ServerAuthInfrastructureRemoteTokenCryptoService } from './server-auth-infrastructure-remote-token-crypto.service';

export interface ServerAuthInfrastructureRemoteTokenCryptoModuleAsyncOptions {
  useFactory: (
    ...args: any[]
  ) =>
    | Promise<ServerAuthInfrastructureRemoteTokenCryptoModuleOptions>
    | ServerAuthInfrastructureRemoteTokenCryptoModuleOptions;
  inject: any[];
}

export interface ServerAuthInfrastructureRemoteTokenCryptoModuleOptions {
  key: string;
}

export const MODULE_OPTIONS = 'SERVER_AUTH_INFRASTRUCTURE_REMOTE_TOKEN_CRYPTO_MODULE_OPTIONS';

@Module({
  exports: [RemoteTokenCryptoService]
})
export class ServerAuthInfrastructureRemoteTokenCryptoModule {
  static registerAsync(
    options: ServerAuthInfrastructureRemoteTokenCryptoModuleAsyncOptions
  ): DynamicModule {
    return {
      module: ServerAuthInfrastructureRemoteTokenCryptoModule,
      providers: [
        {
          provide: MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject
        },
        {
          provide: RemoteTokenCryptoService,
          useFactory: (moduleOptions: ServerAuthInfrastructureRemoteTokenCryptoModuleOptions) =>
            new ServerAuthInfrastructureRemoteTokenCryptoService(moduleOptions.key),
          inject: [MODULE_OPTIONS]
        }
      ]
    };
  }
}
