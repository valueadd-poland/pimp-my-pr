import { NgModule } from '@angular/core';
import { ENVIRONMENT_ADAPTER } from '@pimp-my-pr/pmp-web/shared/domain';
import { environment } from './environment';

@NgModule({
  providers: [
    {
      provide: ENVIRONMENT_ADAPTER,
      useValue: environment
    }
  ]
})
export class EnvironmentModule {}
