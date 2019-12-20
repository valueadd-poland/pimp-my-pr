import { Module } from '@nestjs/common';
import { PmpApiApiServiceRepositoryApiModule } from '@pimp-my-pr/pmp-api/api-service/repository/api';

@Module({ imports: [PmpApiApiServiceRepositoryApiModule] })
export class PmpApiApiServiceShellModule {}
