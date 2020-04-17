import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PmpWebAuthDataAccessModule } from '@pimp-my-pr/pmp-web/auth/data-access';
import { PmpWebAuthFeatureModule } from '@pimp-my-pr/pmp-web/auth/feature';
import { PmpWebAuthPublicModule } from '@pimp-my-pr/pmp-web/auth/public';
import { AuthComponent } from './containers/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { PmpWebAuthShellRoutingModule } from './pmp-web-auth-shell-routing.module';

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
