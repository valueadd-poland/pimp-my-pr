import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthComponent } from './containers/auth/auth.component';
import { PmpWebAuthShellRoutingModule } from './pmp-web-auth-shell-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { PmpWebAuthDataAccessModule } from '@pimp-my-pr/pmp-web/auth/data-access';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { PmpWebAuthPublicModule } from '@pimp-my-pr/pmp-web/auth/public';
import { PmpWebAuthFeatureModule } from '@pimp-my-pr/pmp-web/auth/feature';

@NgModule({
  imports: [
    CommonModule,
    PmpWebAuthShellRoutingModule,
    PmpWebAuthDataAccessModule,
    PmpWebAuthPublicModule,
    PmpWebAuthFeatureModule
  ],
  exports: [PmpWebAuthShellRoutingModule],
  declarations: [AuthComponent],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class PmpWebAuthShellModule {}
